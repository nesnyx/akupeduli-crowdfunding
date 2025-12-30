package auth

import (
	"akupeduli/internal/config"
	"errors"
	"log"

	"github.com/dgrijalva/jwt-go"
)

type Service interface {
	GenerateToken(userId int) (string, error)
	ValidateToken(token string) (*jwt.Token, error)
}

type jwtService struct {
	cfg *config.Config
}

func NewService(cfg *config.Config) *jwtService {
	return &jwtService{cfg}
}

func (s *jwtService) GenerateToken(userId int) (string, error) {
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
