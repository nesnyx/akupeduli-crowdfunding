package routes

import (
	"akupeduli/internal/auth"
	"akupeduli/internal/campaign"
	"akupeduli/internal/config"
	"akupeduli/internal/handler"
	"akupeduli/internal/middleware"
	"akupeduli/internal/payment"
	"akupeduli/internal/transaction"
	"akupeduli/internal/user"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouterUser(routerGroup *gin.RouterGroup, cfg *config.Config, db *gorm.DB) {
	userRepository := user.NewRepository(db)
	userService := user.NewService(userRepository)
	authService := auth.NewService(cfg)
	userHandler := handler.NewUserHandler(userService, authService)
	router := routerGroup.Group("/users")
	{
		router.POST("/register", userHandler.RegisterUser)
		router.POST("/login", userHandler.Login)
		router.POST("/email_checkers", userHandler.CheckEmailAvailability)
		router.POST("/avatars", middleware.AuthMiddleware(authService, userService), userHandler.UploadAvatar)
	}
}
func SetupRouterTransaction(routerGroup *gin.RouterGroup, db *gorm.DB, cfg *config.Config) {
	authService := auth.NewService(cfg)
	userRepository := user.NewRepository(db)
	userService := user.NewService(userRepository)
	paymentService := payment.NewService(cfg)
	campaignRepository := campaign.NewRepository(db)
	trasanctionRepository := transaction.NewRepository(db)
	transactionService := transaction.NewService(trasanctionRepository, campaignRepository, paymentService)
	transactionHandler := handler.NewTransactionHandler(transactionService)
	router := routerGroup.Group("/transactions")
	{
		router.POST("", middleware.AuthMiddleware(authService, userService), transactionHandler.CreateTransaction)
		router.GET("/campaings/:id/transactions", middleware.AuthMiddleware(authService, userService), transactionHandler.GetCampaignTransactions)
		router.GET("", middleware.AuthMiddleware(authService, userService), transactionHandler.GetUserTransactions)
	}
}
func SetupRouterCampaign(routerGroup *gin.RouterGroup, db *gorm.DB, cfg *config.Config) {
	userRepository := user.NewRepository(db)
	userService := user.NewService(userRepository)
	campaignRepository := campaign.NewRepository(db)
	campaignService := campaign.NewService(campaignRepository)
	campaignHandler := handler.NewCampaignHandler(campaignService)
	authService := auth.NewService(cfg)
	router := routerGroup.Group("/campaigns")
	{
		router.GET("", campaignHandler.GetCampaigns)
		router.GET(":id", campaignHandler.GetCampaign)
		router.POST("", middleware.AuthMiddleware(authService, userService), campaignHandler.CreateCampaign)
		router.PUT(":id", middleware.AuthMiddleware(authService, userService), campaignHandler.UpdateCampaign)
		router.POST("/campaign-images", middleware.AuthMiddleware(authService, userService), campaignHandler.UploadImage)
	}

}
