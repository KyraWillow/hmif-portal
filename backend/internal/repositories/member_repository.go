package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type MemberRepository interface {
	FindAll() ([]models.Member, error)
}

type memberRepository struct {
	db *gorm.DB
}

func NewMemberRepository(db *gorm.DB) MemberRepository {
	return &memberRepository{db}
}

func (r *memberRepository) FindAll() ([]models.Member, error) {
	var members []models.Member
	err := r.db.Preload("Division").Find(&members).Error
	return members, err
}