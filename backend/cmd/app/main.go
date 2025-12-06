package main

import (
	"backend/internal/handlers"
	"backend/internal/models"
	"backend/internal/repositories"
	"backend/internal/services"
	"log"
	"os" // PENTING: Untuk baca Environment Variable

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

	db.AutoMigrate(&models.Member{}, &models.Division{}, &models.Achievement{})

	memberRepo := repositories.NewMemberRepository(db)
	memberService := services.NewMemberService(memberRepo)
	memberHandler := handlers.NewMemberHandler(memberService)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://hmif-portal.vercel.app/"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/members", memberHandler.GetMembers)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" 
	}

	log.Println("Server running on port " + port)
	r.Run(":" + port)
}