package campaign

import (
	"akupeduli/internal/user"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Campaign struct {
	ID               string `gorm:"type:char(36);primaryKey"`
	UserID           string `gorm:"type:char(36)"`
	Name             string
	Description      string
	ShortDescription string
	Perks            string
	BackerCount      int
	GoalAmount       int
	CurrentAmount    int
	Slug             string
	CreatedAt        time.Time
	UpdatedAt        time.Time
	CampaignImages   []CampaignImages
	User             user.User `gorm:"foreignKey:UserID;references:ID"`
}

type CampaignImages struct {
	ID         string `gorm:"type:char(36);primaryKey"`
	CampaignId string
	FileName   string
	IsPrimary  int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

func (u *Campaign) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
