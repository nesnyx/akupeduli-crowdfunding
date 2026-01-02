package main

import (
	"akupeduli/internal/campaign"
	"akupeduli/internal/config"
	"akupeduli/internal/routes"
	"akupeduli/internal/transaction"
	"akupeduli/internal/user"
	"log"
	"net/http"

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

	router := gin.Default()
	router.Use(gin.Recovery())
	router.Static("/images", "./images")
	api := router.Group("/api/v1")
	api.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})
	routes.SetupRouterUser(api, cfg, db)
	routes.SetupRouterCampaign(api, db, cfg)
	routes.SetupRouterTransaction(api, db, cfg)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
