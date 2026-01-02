package handler

import (
	"akupeduli/internal/auth"
	"akupeduli/internal/helper"
	"akupeduli/internal/user"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type userHandler struct {
	userService user.Service
	authService auth.Service
}

func NewUserHandler(userService user.Service, authService auth.Service) *userHandler {
	return &userHandler{userService, authService}
}

func (h *userHandler) RegisterUser(c *gin.Context) {
	var input user.RegisterUserInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)

		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Register account failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	input.Provider = user.ProviderLocal
	newUser, err := h.userService.RegisterUser(input)
	if err != nil {
		response := helper.APIResponse("Register account failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	token, err := h.authService.GenerateToken(newUser.ID)
	if err != nil {
		response := helper.APIResponse("Token Generate Failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	formatter := user.FormatUser(newUser, token)
	response := helper.APIResponse("Account has been Registered", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}

func (h *userHandler) LoginGoogle(c *gin.Context) {
	state := uuid.New().String()
	c.SetCookie("oauth_state", state, 600, "/", "", false, true)
	url := h.authService.GetGoogleLoginURL(state)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *userHandler) GoogleCallback(c *gin.Context) {
	stateQuery := c.Query("state")
	stateCookie, err := c.Cookie("oauth_state")

	// Debugging Cookie jika stateQuery != stateCookie
	if err != nil || stateQuery != stateCookie {
		fmt.Printf("State Mismatch! Query: %s, Cookie: %s, Err: %v\n", stateQuery, stateCookie, err)
		c.JSON(http.StatusBadRequest, helper.APIResponse("Invalid oauth state", http.StatusBadRequest, "error", nil))
		return
	}

	code := c.Query("code")
	userInfoByte, err := h.authService.GetGoogleUserInfo(code)
	if err != nil {
		c.JSON(http.StatusBadRequest, helper.APIResponse("Failed to get user info", http.StatusBadRequest, "error", nil))
		return
	}

	var googleUser struct {
		Email string `json:"email"`
		Name  string `json:"name"`
		ID    string `json:"id"`
	}
	json.Unmarshal(userInfoByte, &googleUser)

	loggedUser, err := h.userService.GetUserByEmail(googleUser.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("User baru terdeteksi, memulai registrasi...")
			registerInput := user.RegisterUserInput{
				Name:       googleUser.Name,
				Email:      googleUser.Email,
				Password:   googleUser.ID,
				Occupation: "Google User",
				Provider:   user.ProviderGoogle,
			}

			loggedUser, err = h.userService.RegisterUser(registerInput)
			if err != nil {
				fmt.Println("Gagal Registrasi:", err)
				c.JSON(http.StatusBadRequest, helper.APIResponse("Failed to register", 400, "error", nil))
				return
			}
		} else {

			fmt.Println("Database Error:", err)
			c.JSON(http.StatusInternalServerError, helper.APIResponse("Database connection error", 500, "error", nil))
			return
		}
	}

	token, err := h.authService.GenerateToken(loggedUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, helper.APIResponse("Token failed", 500, "error", nil))
		return
	}

	c.SetCookie("oauth_state", "", -1, "/", "", false, true)
	frontendURL := "http://localhost:5173/auth-success"
	c.Redirect(http.StatusFound, fmt.Sprintf("%s#token=%s", frontendURL, token))
}

func (h *userHandler) Login(c *gin.Context) {
	var input user.LoginInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}
		response := helper.APIResponse("Login failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	loggedUser, err := h.userService.Login(input)
	if err != nil {
		errorMessage := gin.H{"errors": err.Error()}
		response := helper.APIResponse("Login failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	token, err := h.authService.GenerateToken(loggedUser.ID)
	if err != nil {
		response := helper.APIResponse("Token Generate Failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	formatter := user.FormatUser(loggedUser, token)
	response := helper.APIResponse("Login Successfully", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)

}

func (h *userHandler) CheckEmailAvailability(c *gin.Context) {
	var input user.CheckEmailInput
	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}
		response := helper.APIResponse("Email checking failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	IsEmailAvailable, err := h.userService.IsEmailAvailable(input)

	if err != nil {
		errorMessage := gin.H{"errors": "Server Error"}
		response := helper.APIResponse("Email checking failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	data := gin.H{
		"is_available": IsEmailAvailable,
	}

	var metaMessage string

	if IsEmailAvailable {
		metaMessage = "Email is available"
	} else {
		metaMessage = "Email has been registered"
	}

	response := helper.APIResponse(metaMessage, http.StatusOK, "success", data)
	c.JSON(http.StatusOK, response)

}

func (h *userHandler) UploadAvatar(c *gin.Context) {
	file, err := c.FormFile("avatar")
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := helper.APIResponse("Failed to upload avatar image", http.StatusBadRequest, "error", data)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	currentUser := c.MustGet("currentUser").(user.User)
	userId := currentUser.ID

	path := fmt.Sprintf("images/%d-%s", userId, file.Filename)
	err = c.SaveUploadedFile(file, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := helper.APIResponse("Failed to upload avatar image", http.StatusBadRequest, "error", data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = h.userService.SaveAvatar(userId, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := helper.APIResponse("Failed to upload avatar image", http.StatusBadRequest, "error", data)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	data := gin.H{
		"is_uploaded": true,
	}
	response := helper.APIResponse("Avatar Successfully uploade", http.StatusOK, "success", data)
	c.JSON(http.StatusOK, response)

}
