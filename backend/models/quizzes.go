package models

import (
	"time"
	"backend/db"
)

type PerQuizDeadline struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  string `json:"openDate"`
	CloseDate string `json:"closeDate"`
}

type PerQuizDeadlineTime struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  time.Time `json:"openDate"`
	CloseDate time.Time `json:"closeDate"`
	IsActive  bool `json:"isActive"`
	Status string `json:"status"`
}

type PerQuizDeadlineStatus struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  string `json:"openDate"`
	CloseDate string `json:"closeDate"`
	IsActive  bool `json:"isActive"`
	Status string `json:"status"`
}

type QuizLandingInfo struct {
	QuizName string `json:"quizName"`
	QuizDesc string `json:"quizDesc"`
	MaxScore int `json:"maxScore"`
}

func GetQuizLanding (quizUuid any) ([]QuizLandingInfo, error) {
	var list []QuizLandingInfo

	err := db.DB.Raw(`
		SELECT
			quizzes.title as quiz_name,
			quizzes.description as quiz_desc,
			quizzes.max_score as max_Score
		FROM quizzes
		WHERE uuid = ?`, quizUuid).Scan(&list).Error

	if err != nil {
		return nil, err
	}

	return list, nil
}