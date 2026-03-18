package transaction

import "akupeduli/internal/user"

type GetCampaignTransactionsInput struct {
	ID   string `uri:"id" binding:"required"`
	User user.User
}

type CreateTransactionInput struct {
	Amount     int    `json:"amount" binding:"required"`
	CampaignId string `json:"campaign_id" binding:"required"`
	User       user.User
}
