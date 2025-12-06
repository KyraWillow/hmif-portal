package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/internal/repositories"
)

type DivisionHandler struct {
    repo *repositories.DivisionRepository
}

func NewDivisionHandler(repo *repositories.DivisionRepository) *DivisionHandler {
    return &DivisionHandler{repo: repo}
}

func (h *DivisionHandler) GetDivisions(c *gin.Context) {

    divisions, err := h.repo.FindAll()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, divisions)
}