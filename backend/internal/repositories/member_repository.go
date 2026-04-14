package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type MemberRepository interface {
	FindAll() ([]models.Member, error)
	Create(member *models.Member) error
	Update(member *models.Member) error
	Delete(id uint) error
}

type memberRepository struct {
	db *gorm.DB
}

func NewMemberRepository(db *gorm.DB) MemberRepository {
	return &memberRepository{db}
}

func (r *memberRepository) FindAll() ([]models.Member, error) {
	var members []models.Member
	err := r.db.Preload("Division").Order("division_id ASC, sort_order ASC, id ASC").Find(&members).Error
	return members, err
}

func (r *memberRepository) Create(member *models.Member) error {
	return r.db.Create(member).Error
}

func (r *memberRepository) Update(member *models.Member) error {
	return r.db.Save(member).Error
}

func (r *memberRepository) Delete(id uint) error {
	return r.db.Delete(&models.Member{}, id).Error
}
