package payment

import (
	"akupeduli/internal/config"

	"akupeduli/internal/user"
	"errors"
	"fmt"
	"strconv"

	"github.com/veritrans/go-midtrans"
)

type PaymentService interface {
	GetToken(transactionID int, amount int, user user.User) (string, error)
}

type service struct {
	cfg *config.Config
}

func NewService(cfg *config.Config) *service {
	return &service{cfg}
}

func (s *service) GetToken(transactionID int, amount int, user user.User) (string, error) {
	if transactionID <= 0 || amount <= 0 {
		return "", errors.New("invalid transaction")
	}
	if user.Email == "" || user.Name == "" {
		return "", errors.New("user details incomplete")
	}

	midclient := midtrans.NewClient()
	midclient.ServerKey = s.cfg.MidtransServerKey
	midclient.ClientKey = s.cfg.MidtransClientKey
	midclient.APIEnvType = midtrans.Sandbox // atau baca dari config

	snapGateway := midtrans.SnapGateway{Client: midclient}

	snapRequest := &midtrans.SnapReq{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transactionID),
			GrossAmt: int64(amount),
		},
		CustomerDetail: &midtrans.CustDetail{
			Email: user.Email,
			FName: user.Name,
		},
	}

	tokenResp, err := snapGateway.GetToken(snapRequest)
	if err != nil {
		return "", fmt.Errorf("midtrans token generation failed: %w", err)
	}

	return tokenResp.Token, nil // <-- ini yang frontend butuhkan untuk snap.pay()
}
