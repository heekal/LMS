package models

type CourseNameForTask struct {
	CourseName string              `json:"course"`
	CourseUuid string `json:"uuid"`
	Quizzes    []QuizzesReminder   `json:"quizzes"`
}
