package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type CompetitionRepository interface {
	FindAll() ([]models.Competition, error)
	Create(competition *models.Competition) error
	Update(competition *models.Competition) error
	Delete(id uint) error
}

type competitionRepository struct {
	db *gorm.DB
}

func NewCompetitionRepository(db *gorm.DB) CompetitionRepository {
	return &competitionRepository{db: db}
}

func (r *competitionRepository) FindAll() ([]models.Competition, error) {
	var competitions []models.Competition
	err := r.db.Order("sort_order ASC, id ASC").Find(&competitions).Error
	return competitions, err
}

func (r *competitionRepository) Create(competition *models.Competition) error {
	return r.db.Create(competition).Error
}

func (r *competitionRepository) Update(competition *models.Competition) error {
	return r.db.Save(competition).Error
}

func (r *competitionRepository) Delete(id uint) error {
	return r.db.Delete(&models.Competition{}, id).Error
}
