package transaction

import (
	"akupeduli/internal/campaign"
	"errors"
)

type Service interface {
	GetTransactionsByCampaignId(input GetCampaignTransactionsInput) ([]Transaction, error)
	GetTransactionsByUserId(userId int) ([]Transaction, error)
	CreateTransaction(input CreateTransactionInput) (Transaction, error)
}

type service struct {
	repository         Repository
	campaignRepository campaign.Repository
}

func NewService(repository Repository, campaignRepository campaign.Repository) *service {
	return &service{repository, campaignRepository}
}

func (s *service) GetTransactionsByCampaignId(input GetCampaignTransactionsInput) ([]Transaction, error) {

	campaign, err := s.campaignRepository.FindById(input.ID)
	if err != nil {
		return []Transaction{}, err
	}

	if campaign.UserId != input.User.ID {
		return []Transaction{}, errors.New("not an owner of the campaign")
	}

	transactions, err := s.repository.GetByCampaignId(input.ID)
	if err != nil {
		return transactions, err
	}
	return transactions, nil
}

func (s *service) GetTransactionsByUserId(userId int) ([]Transaction, error) {
	transactions, err := s.repository.GetByUserId(userId)
	if err != nil {
		return transactions, err
	}
	return transactions, nil
}

func (s *service) CreateTransaction(input CreateTransactionInput) (Transaction, error) {
	transaction := Transaction{
		ID:     input.CampaignId,
		Amount: input.Amount,
		UserId: input.User.ID,
		Status: "pending",
	}
	newTransaction, err := s.repository.Save(transaction)
	if err != nil {
		return newTransaction, err
	}
	return newTransaction, nil
}
