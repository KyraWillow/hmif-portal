package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type DivisionRepository struct {
    db *gorm.DB
}

func NewDivisionRepository(db *gorm.DB) *DivisionRepository {
    return &DivisionRepository{db: db}
}

func (r *DivisionRepository) FindAll() ([]models.Division, error) {
    var divisions []models.Division
    
    result := r.db.Find(&divisions)
    
    return divisions, result.Error
}