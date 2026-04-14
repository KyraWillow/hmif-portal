package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"errors"

	"gorm.io/gorm"
)

type AdminBootstrap struct {
	SiteContent  models.SiteContent   `json:"site_content"`
	Achievements []models.Achievement `json:"achievements"`
	Competitions []models.Competition `json:"competitions"`
	Divisions    []models.Division    `json:"divisions"`
	Members      []models.Member      `json:"members"`
}

type ContentService interface {
	GetSiteContent() (models.SiteContent, error)
	SaveSiteContent(content *models.SiteContent) error
	GetAdminBootstrap() (AdminBootstrap, error)
	GetAchievements() ([]models.Achievement, error)
	CreateAchievement(achievement *models.Achievement) error
	UpdateAchievement(achievement *models.Achievement) error
	DeleteAchievement(id uint) error
	GetCompetitions() ([]models.Competition, error)
	CreateCompetition(competition *models.Competition) error
	UpdateCompetition(competition *models.Competition) error
	DeleteCompetition(id uint) error
	GetDivisions() ([]models.Division, error)
	CreateDivision(division *models.Division) error
	UpdateDivision(division *models.Division) error
	DeleteDivision(id uint) error
	GetMembers() ([]models.Member, error)
	CreateMember(member *models.Member) error
	UpdateMember(member *models.Member) error
	DeleteMember(id uint) error
}

type contentService struct {
	siteContents repositories.SiteContentRepository
	achievements repositories.AchievementRepository
	competitions repositories.CompetitionRepository
	divisions    repositories.DivisionRepository
	members      repositories.MemberRepository
}

func NewContentService(
	siteContents repositories.SiteContentRepository,
	achievements repositories.AchievementRepository,
	competitions repositories.CompetitionRepository,
	divisions repositories.DivisionRepository,
	members repositories.MemberRepository,
) ContentService {
	return &contentService{
		siteContents: siteContents,
		achievements: achievements,
		competitions: competitions,
		divisions:    divisions,
		members:      members,
	}
}

func defaultSiteContent() models.SiteContent {
	return models.SiteContent{
		ID:                 1,
		SiteName:           "HMIF UISI",
		OrganizationLabel:  "Universitas Internasional Semen Indonesia",
		HeroTitle:          "Himpunan Mahasiswa\nInformatika",
		HeroDescription:    "Ruang kolaborasi mahasiswa Informatika untuk tumbuh secara akademik, organisatoris, dan profesional.",
		HeroSubtitle:       "BERSAMA KITA BISA, SAMPEAN JOSSS.",
		AboutBadge:         "Tentang Kami",
		AboutTitle:         "Tentang HMIF",
		AboutDescription:   "Himpunan Mahasiswa Informatika (HMIF) adalah rumah bagi seluruh mahasiswa Informatika. Kami berdedikasi untuk mengembangkan potensi akademik, non-akademik, dan soft skill.",
		Vision:             "Membangun HMIF yang solid, bertanggung jawab, dan profesional.",
		Mission:            "Membentuk pribadi adaptif, peduli, dan inovatif dalam lingkungan Informatika.",
		FooterDescription:  "Membentuk pribadi adaptif, peduli, dan inovatif dalam lingkungan Informatika.",
		MaintenanceTitle:   "Website Sedang Maintenance",
		MaintenanceMessage: "Kami sedang melakukan pembaruan konten. Silakan kembali beberapa saat lagi.",
	}
}

func (s *contentService) getOrCreateSiteContent() (models.SiteContent, error) {
	content, err := s.siteContents.Get()
	if err == nil {
		return *content, nil
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return models.SiteContent{}, err
	}

	defaultContent := defaultSiteContent()
	if err := s.siteContents.Save(&defaultContent); err != nil {
		return models.SiteContent{}, err
	}
	return defaultContent, nil
}

func (s *contentService) GetSiteContent() (models.SiteContent, error) {
	return s.getOrCreateSiteContent()
}

func (s *contentService) SaveSiteContent(content *models.SiteContent) error {
	if content == nil {
		return errors.New("site content tidak boleh kosong")
	}

	content.ID = 1
	return s.siteContents.Save(content)
}

func (s *contentService) GetAdminBootstrap() (AdminBootstrap, error) {
	siteContent, err := s.getOrCreateSiteContent()
	if err != nil {
		return AdminBootstrap{}, err
	}

	achievements, err := s.achievements.FindAll()
	if err != nil {
		return AdminBootstrap{}, err
	}

	competitions, err := s.competitions.FindAll()
	if err != nil {
		return AdminBootstrap{}, err
	}

	divisions, err := s.divisions.FindAll()
	if err != nil {
		return AdminBootstrap{}, err
	}

	members, err := s.members.FindAll()
	if err != nil {
		return AdminBootstrap{}, err
	}

	return AdminBootstrap{
		SiteContent:  siteContent,
		Achievements: achievements,
		Competitions: competitions,
		Divisions:    divisions,
		Members:      members,
	}, nil
}

func (s *contentService) GetAchievements() ([]models.Achievement, error) {
	return s.achievements.FindAll()
}

func (s *contentService) CreateAchievement(achievement *models.Achievement) error {
	return s.achievements.Create(achievement)
}

func (s *contentService) UpdateAchievement(achievement *models.Achievement) error {
	return s.achievements.Update(achievement)
}

func (s *contentService) DeleteAchievement(id uint) error {
	return s.achievements.Delete(id)
}

func (s *contentService) GetCompetitions() ([]models.Competition, error) {
	return s.competitions.FindAll()
}

func (s *contentService) CreateCompetition(competition *models.Competition) error {
	return s.competitions.Create(competition)
}

func (s *contentService) UpdateCompetition(competition *models.Competition) error {
	return s.competitions.Update(competition)
}

func (s *contentService) DeleteCompetition(id uint) error {
	return s.competitions.Delete(id)
}

func (s *contentService) GetDivisions() ([]models.Division, error) {
	return s.divisions.FindAll()
}

func (s *contentService) CreateDivision(division *models.Division) error {
	return s.divisions.Create(division)
}

func (s *contentService) UpdateDivision(division *models.Division) error {
	return s.divisions.Update(division)
}

func (s *contentService) DeleteDivision(id uint) error {
	return s.divisions.Delete(id)
}

func (s *contentService) GetMembers() ([]models.Member, error) {
	return s.members.FindAll()
}

func (s *contentService) CreateMember(member *models.Member) error {
	return s.members.Create(member)
}

func (s *contentService) UpdateMember(member *models.Member) error {
	return s.members.Update(member)
}

func (s *contentService) DeleteMember(id uint) error {
	return s.members.Delete(id)
}
