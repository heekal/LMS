package models

type EnrollmentsResponse struct {
	CourseName string `json:"courseName" gorm:"column:name"`
	CourseCode string `json:"courseCode" gorm:"column:code"`
	CourseUuid string `json:"courseUuid" gorm:"column:uuid"`
}