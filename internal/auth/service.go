package auth

import (
	"akupeduli/internal/config"
	"context"
	"errors"
	"log"
	"net/http"

	"io"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type Service interface {
	GenerateToken(userId string) (string, error)
	ValidateToken(token string) (*jwt.Token, error)
	GetGoogleLoginURL(state string) string         // Tambahkan ini
	GetGoogleUserInfo(code string) ([]byte, error) // Tambahkan ini
}

type jwtService struct {
	cfg               *config.Config
	googleOauthConfig *oauth2.Config
}

func NewService(cfg *config.Config) *jwtService {
	conf := &oauth2.Config{
		RedirectURL:  cfg.RedirectGoogleURL,
		ClientID:     cfg.ClientIDGoogle,
		ClientSecret: cfg.ClientSecretGoogle,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
	return &jwtService{cfg, conf}
}

func (s *jwtService) GetGoogleLoginURL(state string) string {
	// Di produksi, ganti "state-token" dengan sesuatu yang dinamis (bisa simpan di session/cookie)
	return s.googleOauthConfig.AuthCodeURL(state)
}

func (s *jwtService) GenerateToken(userId string) (string, error) {
	claim := jwt.MapClaims{}
	claim["user_id"] = userId
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	signedToken, err := token.SignedString(s.cfg.JWTSecretKey)
	if err != nil {
		log.Println("Failed to sign token:", err)
		return signedToken, err
	}
	return signedToken, nil
}

func (s *jwtService) ValidateToken(encodedToken string) (*jwt.Token, error) {
	token, err := jwt.Parse(encodedToken, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, errors.New("invalid Token")
		}
		return []byte(s.cfg.JWTSecretKey), nil
	})
	if err != nil {
		return token, err
	}
	return token, nil

}

func (s *jwtService) GetGoogleUserInfo(code string) ([]byte, error) {
	token, err := s.googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, err
	}

	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	return io.ReadAll(response.Body)
}
