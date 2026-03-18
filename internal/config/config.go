package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port               string
	JWTSecretKey       []byte
	MidtransClientKey  string
	MidtransServerKey  string
	ClientIDGoogle     string
	ClientSecretGoogle string
	RedirectGoogleURL  string
	DatabaseName       string
	PostgresDB         string
	PostgresUser       string
	PostgresPassword   string
	PostgresPort       string
	PostgresHost       string
	PostgresSSL        string
	FrontendURL        string
}

var AppConfig *Config

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		log.Printf("[INFO] No .env file found — using environment variables only")
	}
	jwtSecret := getEnv("JWT_SECRET_KEY", "")

	AppConfig = &Config{
		Port:               getEnv("PORT", ""),
		JWTSecretKey:       []byte(jwtSecret),
		MidtransClientKey:  getEnv("MIDTRANS_CLIENT_KEY", ""),
		MidtransServerKey:  getEnv("MIDTRANS_SERVER_KEY", ""),
		ClientIDGoogle:     getEnv("CLIENT_ID_GOOGLE", ""),
		ClientSecretGoogle: getEnv("CLIENT_SECRET_GOOGLE", ""),
		RedirectGoogleURL:  getEnv("REDIRECT_GOOGLE_URL", ""),
		PostgresDB:         getEnv("POSTGRESQL_DB", ""),
		PostgresUser:       getEnv("POSTGRESQL_USER", ""),
		PostgresPassword:   getEnv("POSTGRESQL_PASSWORD", ""),
		PostgresPort:       getEnv("POSTGRESQL_PORT", ""),
		PostgresHost:       getEnv("POSTGRESQL_HOST", ""),
		PostgresSSL:        getEnv("POSTGRESQL_SSL", ""),
		FrontendURL:        getEnv("FRONTEND_URL", ""),
	}
	return AppConfig, nil
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
