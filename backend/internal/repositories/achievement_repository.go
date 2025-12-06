package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type AchievementRepository struct {
    db *gorm.DB
}

func NewAchievementRepository(db *gorm.DB) *AchievementRepository {
    return &AchievementRepository{db: db}
}

func (r *AchievementRepository) FindAll() ([]models.Achievement, error) {
    var achievements []models.Achievement
    
    result := r.db.Find(&achievements)
    
    return achievements, result.Error
}