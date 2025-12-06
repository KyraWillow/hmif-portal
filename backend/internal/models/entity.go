package models

type Division struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name"`
	Description string `json:"description"`
	LogoURL     string `json:"logo_url"`
}

type Member struct {
	ID         uint     `json:"id" gorm:"primaryKey"`
	DivisionID uint     `json:"division_id"`
	Name       string   `json:"name"`
	NIM        string   `json:"nim"`
	Role       string   `json:"role"`
	ImageURL   string   `json:"image_url"`
	Division   Division `json:"division" gorm:"foreignKey:DivisionID"`
}

type Achievement struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Title       string `json:"title"`
	StudentName string `json:"student_name"`
	Rank        string `json:"rank"`
	EventName   string `json:"event_name"`
	PhotoURL    string `json:"photo_url"`
	Description string `json:"description"`
}