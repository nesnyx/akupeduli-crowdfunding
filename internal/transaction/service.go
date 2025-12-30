package transaction

import (
	"akupeduli/internal/campaign"
	"akupeduli/internal/payment"

	"errors"
)

type Service interface {
	GetTransactionsByCampaignId(input GetCampaignTransactionsInput) ([]Transaction, error)
	GetTransactionsByUserId(userId int) ([]Transaction, error)
	CreateTransaction(input CreateTransactionInput) (Transaction, string, error)
}

type service struct {
	repository         Repository
	campaignRepository campaign.Repository
	payment            payment.PaymentService
}

func NewService(repository Repository, campaignRepository campaign.Repository, payment payment.PaymentService) *service {
	return &service{repository, campaignRepository, payment}
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

func (s *service) CreateTransaction(input CreateTransactionInput) (Transaction, string, error) {
	transaction := Transaction{
		ID:     input.CampaignId,
		Amount: input.Amount,
		UserId: input.User.ID,
		Status: "pending",
	}
	newTransaction, err := s.repository.Save(transaction)
	if err != nil {
		return newTransaction, "", err
	}
	token, err := s.payment.GetToken(newTransaction.ID, input.Amount, input.User)
	if err != nil {
		return newTransaction, "", err
	}
	return newTransaction, token, nil
}
