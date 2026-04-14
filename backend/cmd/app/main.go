package main

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"backend/internal/models"
	"backend/internal/repositories"
	"backend/internal/services"
	"log"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	_ = godotenv.Load()
	dsn := os.Getenv("DATABASE_URL")

	if dsn == "" {
		log.Fatal("DATABASE_URL tidak ditemukan di environment!")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("GAGAL CONNECT DATABASE: ", err)
	}

	if err := db.AutoMigrate(
		&models.Division{},
		&models.Member{},
		&models.Achievement{},
		&models.Competition{},
		&models.SiteContent{},
	); err != nil {
		log.Fatal("GAGAL MIGRASI DATABASE: ", err)
	}

	memberRepo := repositories.NewMemberRepository(db)
	divisionRepo := repositories.NewDivisionRepository(db)
	achievementRepo := repositories.NewAchievementRepository(db)
	competitionRepo := repositories.NewCompetitionRepository(db)
	siteContentRepo := repositories.NewSiteContentRepository(db)

	memberService := services.NewMemberService(memberRepo)
	memberHandler := handlers.NewMemberHandler(memberService)
	contentService := services.NewContentService(
		siteContentRepo,
		achievementRepo,
		competitionRepo,
		divisionRepo,
		memberRepo,
	)
	contentHandler := handlers.NewContentHandler(contentService)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return strings.HasPrefix(origin, "http://localhost:") ||
				strings.HasPrefix(origin, "http://127.0.0.1:") ||
				origin == "https://hmif-portal.vercel.app"
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "X-Admin-Token"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/site-content", contentHandler.GetSiteContent)
		api.GET("/achievements", contentHandler.GetAchievements)
		api.GET("/competitions", contentHandler.GetCompetitions)
		api.GET("/divisions", contentHandler.GetDivisions)
		api.GET("/members", memberHandler.GetMembers)
	}

	admin := api.Group("/admin")
	admin.Use(middleware.AdminAuthMiddleware())
	{
		admin.GET("/bootstrap", contentHandler.GetAdminBootstrap)
		admin.PUT("/site-content", contentHandler.UpdateSiteContent)

		admin.POST("/achievements", contentHandler.CreateAchievement)
		admin.PUT("/achievements/:id", contentHandler.UpdateAchievement)
		admin.DELETE("/achievements/:id", contentHandler.DeleteAchievement)

		admin.POST("/competitions", contentHandler.CreateCompetition)
		admin.PUT("/competitions/:id", contentHandler.UpdateCompetition)
		admin.DELETE("/competitions/:id", contentHandler.DeleteCompetition)

		admin.POST("/divisions", contentHandler.CreateDivision)
		admin.PUT("/divisions/:id", contentHandler.UpdateDivision)
		admin.DELETE("/divisions/:id", contentHandler.DeleteDivision)

		admin.POST("/members", contentHandler.CreateMember)
		admin.PUT("/members/:id", contentHandler.UpdateMember)
		admin.DELETE("/members/:id", contentHandler.DeleteMember)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server running on port " + port)
	r.Run(":" + port)
}
