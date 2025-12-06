package main

import (
	"backend/internal/handlers"
	"backend/internal/models"
	"backend/internal/repositories"
	"backend/internal/services"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	dsn := "host=127.0.0.1 user=postgres password=2232 dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("GAGAL CONNECT DATABASE: ", err)
	}

	db.AutoMigrate(&models.Member{}, &models.Division{}, &models.Achievement{})

	memberRepo := repositories.NewMemberRepository(db)
	memberService := services.NewMemberService(memberRepo)
	memberHandler := handlers.NewMemberHandler(memberService)

	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/members", memberHandler.GetMembers)
		// api.GET("/divisions", divisionHandler.GetDivisions) 
		// api.GET("/achievements", achievementHandler.GetAchievements) 
	}

	log.Println("Server running on port 8080")
	r.Run(":8080")
}