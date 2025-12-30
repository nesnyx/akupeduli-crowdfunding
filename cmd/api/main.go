package main

import (
	"akupeduli/internal/auth"
	"akupeduli/internal/campaign"
	"akupeduli/internal/config"
	"akupeduli/internal/handler"
	"akupeduli/internal/helper"
	"akupeduli/internal/transaction"
	"akupeduli/internal/user"
	"log"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func main() {
	dsn := "database.db"
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err.Error())
	}
	if err := db.AutoMigrate(
		&user.User{},
		&campaign.Campaign{},
		&transaction.Transaction{},
	); err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	userRepository := user.NewRepository(db)
	userService := user.NewService(userRepository)
	authService := auth.NewService(cfg)
	campaignRepository := campaign.NewRepository(db)
	campaignService := campaign.NewService(campaignRepository)

	trasanctionRepository := transaction.NewRepository(db)
	transactionService := transaction.NewService(trasanctionRepository, campaignRepository)

	campaignHandler := handler.NewCampaignHandler(campaignService)
	userHandler := handler.NewUserHandler(userService, authService)
	transactionHandler := handler.NewTransactionHandler(transactionService)

	router := gin.Default()
	router.Static("/images", "./images")
	api := router.Group("/api/v1")
	api.POST("/users", userHandler.RegisterUser)
	api.POST("/sessions", userHandler.Login)
	api.POST("/email_checkers", userHandler.CheckEmailAvailability)
	api.POST("/avatars", authMiddleware(authService, userService), userHandler.UploadAvatar)

	api.GET("/campaigns", campaignHandler.GetCampaigns)
	api.GET("/campaigns/:id", campaignHandler.GetCampaign)
	api.POST("/campaigns", authMiddleware(authService, userService), campaignHandler.CreateCampaign)
	api.PUT("/campaigns/:id", authMiddleware(authService, userService), campaignHandler.UpdateCampaign)
	api.POST("/campaign-images", authMiddleware(authService, userService), campaignHandler.UploadImage)

	// Transactions
	api.GET("/campaings/:id/transactions", authMiddleware(authService, userService), transactionHandler.GetCampaignTransactions)
	api.GET("/transactions", authMiddleware(authService, userService), transactionHandler.GetUserTransactions)

	if err := router.Run(":4001"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}

func authMiddleware(authService auth.Service, userService user.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if !strings.Contains(authHeader, "Bearer") {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		tokenString := ""
		arrayToken := strings.Split(authHeader, " ")
		if len(arrayToken) == 2 {
			tokenString = arrayToken[1]
		}

		token, err := authService.ValidateToken(tokenString)
		if err != nil {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}
		claim, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}
		userId := int(claim["user_id"].(float64))

		user, err := userService.GetUserById(userId)

		if err != nil {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		// get
		c.Set("currentUser", user)

	}
}
