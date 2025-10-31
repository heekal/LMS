package models

import (
	"time"
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
}