package transaction

import "gorm.io/gorm"

type Repository interface {
	GetByCampaignId(campaignId string) ([]Transaction, error)
	GetByUserId(userId string) ([]Transaction, error)
	Save(transaction Transaction) (Transaction, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetByCampaignId(campaignId string) ([]Transaction, error) {
	var transactions []Transaction
	err := r.db.Where("campaing_id = ?", campaignId).Order("id desc").Find(&transactions).Error
	if err != nil {
		return transactions, err
	}
	return transactions, nil
}

func (r *repository) GetByUserId(userId string) ([]Transaction, error) {
	var transactions []Transaction
	err := r.db.Where("user_id = ?", userId).Order("id desc").Find(&transactions).Error
	if err != nil {
		return transactions, err
	}
	return transactions, nil
}

func (r *repository) Save(transaction Transaction) (Transaction, error) {
	err := r.db.Create(&transaction).Error
	if err != nil {
		return transaction, err
	}
	return transaction, nil
}
