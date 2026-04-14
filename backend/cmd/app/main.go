package main

import (
	"backend/database"
	"backend/internal/handlers"
	"backend/internal/middleware"
	"backend/internal/models"
	"backend/internal/repositories"
	"backend/internal/services"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db, err := database.OpenFromEnv()
	if err != nil {
		log.Fatal(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("gagal mendapatkan koneksi database SQL: ", err)
	}
	if err := sqlDB.Ping(); err != nil {
		log.Fatal("gagal ping database: ", err)
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

	adminToken := strings.TrimSpace(os.Getenv("ADMIN_TOKEN"))
	if adminToken == "" {
		log.Fatal("ADMIN_TOKEN wajib diisi untuk mengakses endpoint admin")
	}

	r := gin.Default()
	if err := r.SetTrustedProxies(nil); err != nil {
		log.Fatal("gagal mengatur trusted proxies: ", err)
	}

	allowedOrigins := parseCSVEnv("CORS_ALLOWED_ORIGINS")
	if len(allowedOrigins) == 0 {
		allowedOrigins = []string{
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			"http://localhost:4173",
			"http://127.0.0.1:4173",
			"https://*.vercel.app",
		}
	}

	r.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return originAllowed(origin, allowedOrigins)
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "X-Admin-Token"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	api := r.Group("/api")
	{
		api.GET("/site-content", contentHandler.GetSiteContent)
		api.GET("/achievements", contentHandler.GetAchievements)
		api.GET("/competitions", contentHandler.GetCompetitions)
		api.GET("/divisions", contentHandler.GetDivisions)
		api.GET("/members", memberHandler.GetMembers)
	}

	admin := api.Group("/admin")
	admin.Use(middleware.AdminAuthMiddleware(adminToken))
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
	if err := r.Run(":" + port); err != nil {
		log.Fatal("gagal menjalankan server: ", err)
	}
}

func parseCSVEnv(key string) []string {
	raw := strings.TrimSpace(os.Getenv(key))
	if raw == "" {
		return nil
	}

	parts := strings.Split(raw, ",")
	result := make([]string, 0, len(parts))
	for _, part := range parts {
		item := strings.TrimSpace(part)
		if item != "" {
			result = append(result, item)
		}
	}
	return result
}

func originAllowed(origin string, allowedOrigins []string) bool {
	originURL, err := url.Parse(origin)
	if err != nil || originURL.Scheme == "" || originURL.Host == "" {
		return false
	}

	originHost := originURL.Hostname()
	for _, allowed := range allowedOrigins {
		pattern := strings.TrimSpace(allowed)
		if pattern == "" {
			continue
		}

		if pattern == "*" || strings.EqualFold(origin, pattern) {
			return true
		}

		if strings.HasPrefix(pattern, "*.") {
			if hasSubdomainSuffix(originHost, strings.TrimPrefix(pattern, "*.")) {
				return true
			}
			continue
		}

		if strings.Contains(pattern, "://") {
			patternURL, parseErr := url.Parse(pattern)
			if parseErr != nil || patternURL.Scheme == "" || patternURL.Host == "" {
				continue
			}

			patternHost := patternURL.Hostname()
			if strings.HasPrefix(patternHost, "*.") {
				if strings.EqualFold(originURL.Scheme, patternURL.Scheme) &&
					hasSubdomainSuffix(originHost, strings.TrimPrefix(patternHost, "*.")) {
					return true
				}
				continue
			}

			if strings.EqualFold(originURL.Scheme, patternURL.Scheme) &&
				strings.EqualFold(originURL.Host, patternURL.Host) {
				return true
			}
			continue
		}

		if strings.EqualFold(originHost, pattern) {
			return true
		}
	}

	return false
}

func hasSubdomainSuffix(host, suffix string) bool {
	host = strings.ToLower(strings.TrimSpace(host))
	suffix = strings.ToLower(strings.TrimSpace(suffix))
	if host == "" || suffix == "" || host == suffix {
		return false
	}

	return strings.HasSuffix(host, "."+suffix)
}
