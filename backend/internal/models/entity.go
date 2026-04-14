package models

import "time"

type Division struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name"`
	Description string `json:"description" gorm:"type:text"`
	LogoURL     string `json:"logo_url"`
	SortOrder   int    `json:"sort_order"`
}

type Member struct {
	ID         uint     `json:"id" gorm:"primaryKey"`
	DivisionID uint     `json:"division_id"`
	Name       string   `json:"name"`
	NIM        string   `json:"nim"`
	Role       string   `json:"role"`
	ImageURL   string   `json:"image_url"`
	SortOrder  int      `json:"sort_order"`
	Division   Division `json:"division" gorm:"foreignKey:DivisionID"`
}

type Achievement struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Title       string `json:"title"`
	StudentName string `json:"student_name"`
	Rank        string `json:"rank"`
	EventName   string `json:"event_name"`
	PhotoURL    string `json:"photo_url"`
	Description string `json:"description" gorm:"type:text"`
	SortOrder   int    `json:"sort_order"`
}

type Competition struct {
	ID              uint   `json:"id" gorm:"primaryKey"`
	Name            string `json:"name"`
	Description     string `json:"description" gorm:"type:text"`
	Requirements    string `json:"requirements" gorm:"type:text"`
	Level           string `json:"level"`
	Audience        string `json:"audience"`
	RegistrationURL string `json:"registration_url"`
	MonthLabel      string `json:"month_label"`
	DateLabel       string `json:"date_label"`
	SortOrder       int    `json:"sort_order"`
}

type SiteContent struct {
	ID                 uint      `json:"id" gorm:"primaryKey"`
	SiteName           string    `json:"site_name"`
	OrganizationLabel  string    `json:"organization_label"`
	HeroTitle          string    `json:"hero_title" gorm:"type:text"`
	HeroDescription    string    `json:"hero_description" gorm:"type:text"`
	HeroSubtitle       string    `json:"hero_subtitle" gorm:"type:text"`
	AboutBadge         string    `json:"about_badge"`
	AboutTitle         string    `json:"about_title"`
	AboutDescription   string    `json:"about_description" gorm:"type:text"`
	Vision             string    `json:"vision" gorm:"type:text"`
	Mission            string    `json:"mission" gorm:"type:text"`
	FooterDescription  string    `json:"footer_description" gorm:"type:text"`
	MaintenanceMode    bool      `json:"maintenance_mode"`
	MaintenanceTitle   string    `json:"maintenance_title"`
	MaintenanceMessage string    `json:"maintenance_message" gorm:"type:text"`
	UpdatedAt          time.Time `json:"updated_at"`
}
