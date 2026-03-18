package transaction

import (
	"akupeduli/internal/campaign"
	"akupeduli/internal/user"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Transaction struct {
	ID         string `gorm:"type:char(36);primaryKey"`
	CampaignId int
	UserId     string
	User       user.User
	Amount     int
	Status     string
	Code       string
	Campaign   campaign.Campaign
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

func (u *Transaction) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
