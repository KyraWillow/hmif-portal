package handlers

import (
	"backend/internal/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AchievementHandler struct {
    repo *repositories.AchievementRepository
}

func NewAchievementHandler(repo *repositories.AchievementRepository) *AchievementHandler {
    return &AchievementHandler{repo: repo}
}

func (h *AchievementHandler) GetAchievements(c *gin.Context) {
    achievements, err := h.repo.FindAll()
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, achievements)
}