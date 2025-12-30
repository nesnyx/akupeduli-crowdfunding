package handler

import (
	"akupeduli/internal/payment"

	"github.com/gin-gonic/gin"
)

type paymentHandler struct {
	service payment.Service
}

func NewPaymenHandler(service payment.Service) *paymentHandler {
	return &paymentHandler{service}
}

func (h *paymentHandler) GetPaymentToken(c *gin.Context) {
}
