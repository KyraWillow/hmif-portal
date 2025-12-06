package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
)

type MemberService interface {
	GetAllMembers() ([]models.Member, error)
}

type memberService struct {
	repo repositories.MemberRepository
}

func NewMemberService(repo repositories.MemberRepository) MemberService {
	return &memberService{repo}
}

func (s *memberService) GetAllMembers() ([]models.Member, error) {
	return s.repo.FindAll()
}