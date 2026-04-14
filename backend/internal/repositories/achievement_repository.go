package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type AchievementRepository interface {
	FindAll() ([]models.Achievement, error)
	Create(achievement *models.Achievement) error
	Update(achievement *models.Achievement) error
	Delete(id uint) error
}

type achievementRepository struct {
	db *gorm.DB
}

func NewAchievementRepository(db *gorm.DB) AchievementRepository {
	return &achievementRepository{db: db}
}

func (r *achievementRepository) FindAll() ([]models.Achievement, error) {
	var achievements []models.Achievement
	err := r.db.Order("sort_order ASC, id ASC").Find(&achievements).Error
	return achievements, err
}

func (r *achievementRepository) Create(achievement *models.Achievement) error {
	return r.db.Create(achievement).Error
}

func (r *achievementRepository) Update(achievement *models.Achievement) error {
	return r.db.Save(achievement).Error
}

func (r *achievementRepository) Delete(id uint) error {
	return r.db.Delete(&models.Achievement{}, id).Error
}
