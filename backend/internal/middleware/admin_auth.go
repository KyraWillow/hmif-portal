package middleware

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func AdminAuthMiddleware() gin.HandlerFunc {
	token := os.Getenv("ADMIN_TOKEN")
	if token == "" {
		token = "hmif-admin"
		log.Println("ADMIN_TOKEN belum diatur, menggunakan token default 'hmif-admin'")
	}

	return func(c *gin.Context) {
		if c.GetHeader("X-Admin-Token") != token {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "akses admin ditolak",
			})
			return
		}

		c.Next()
	}
}
