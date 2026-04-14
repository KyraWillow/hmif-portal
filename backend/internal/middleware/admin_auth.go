package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AdminAuthMiddleware(token string) gin.HandlerFunc {
	expectedToken := strings.TrimSpace(token)
	return func(c *gin.Context) {
		if c.GetHeader("X-Admin-Token") != expectedToken {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "akses admin ditolak",
			})
			return
		}

		c.Next()
	}
}
