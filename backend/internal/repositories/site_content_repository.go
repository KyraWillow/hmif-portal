package repositories

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type SiteContentRepository interface {
	Get() (*models.SiteContent, error)
	Save(content *models.SiteContent) error
}

type siteContentRepository struct {
	db *gorm.DB
}

func NewSiteContentRepository(db *gorm.DB) SiteContentRepository {
	return &siteContentRepository{db: db}
}

func (r *siteContentRepository) Get() (*models.SiteContent, error) {
	var content models.SiteContent
	err := r.db.First(&content, 1).Error
	if err != nil {
		return nil, err
	}
	return &content, nil
}

func (r *siteContentRepository) Save(content *models.SiteContent) error {
	content.ID = 1
	return r.db.Save(content).Error
}
