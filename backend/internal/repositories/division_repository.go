package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type DivisionRepository interface {
	FindAll() ([]models.Division, error)
	Create(division *models.Division) error
	Update(division *models.Division) error
	Delete(id uint) error
}

type divisionRepository struct {
	db *gorm.DB
}

func NewDivisionRepository(db *gorm.DB) DivisionRepository {
	return &divisionRepository{db: db}
}

func (r *divisionRepository) FindAll() ([]models.Division, error) {
	var divisions []models.Division
	err := r.db.Order("sort_order ASC, id ASC").Find(&divisions).Error
	return divisions, err
}

func (r *divisionRepository) Create(division *models.Division) error {
	return r.db.Create(division).Error
}

func (r *divisionRepository) Update(division *models.Division) error {
	return r.db.Save(division).Error
}

func (r *divisionRepository) Delete(id uint) error {
	return r.db.Delete(&models.Division{}, id).Error
}
