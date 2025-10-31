package models

type QuizzesReminder struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  string `json:"openDate" gorm:"column:opened"`
	CloseDate string `json:"closeDate" gorm:"column:closed"`
}