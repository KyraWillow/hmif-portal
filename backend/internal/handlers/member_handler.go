package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MemberHandler struct {
	service services.MemberService
}

func NewMemberHandler(service services.MemberService) *MemberHandler {
	return &MemberHandler{service}
}

func (h *MemberHandler) GetMembers(c *gin.Context) {
	members, err := h.service.GetAllMembers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, members)
}