package models

type EnrollmentsResponse struct {
	CourseName string `json:"courseName" gorm:"column:name"`
	CourseCode string `json:"courseCode" gorm:"column:code"`
	CourseUuid string `json:"courseUuid" gorm:"column:uuid"`
}

type EnrollmentsForNavbar struct {
	CourseName string `json:"courseName" gorm:"column:name"`
	CourseUuid string `json:"courseUuid" gorm:"column:uuid"`
}