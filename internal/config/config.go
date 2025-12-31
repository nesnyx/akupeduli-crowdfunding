package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port              string
	JWTSecretKey      []byte
	MidtransClientKey string
	MidtransServerKey string
}

var AppConfig *Config

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		log.Printf("[INFO] No .env file found — using environment variables only")
	}
	jwtSecret := getEnv("JWT_SECRET_KEY", "")

	AppConfig = &Config{
		Port:              getEnv("PORT", ""),
		JWTSecretKey:      []byte(jwtSecret),
		MidtransClientKey: getEnv("MIDTRANS_CLIENT_KEY", ""),
		MidtransServerKey: getEnv("MIDTRANS_SERVER_KEY", ""),
	}
	return AppConfig, nil
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
