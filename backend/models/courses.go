package models

import (
	"backend/db"
)

type CourseNameForTask struct {
	CourseName string              `json:"course"`
	CourseUuid string `json:"uuid"`
	Quizzes    []QuizzesReminder   `json:"quizzes"`
}

type CourseItem struct {
	CourseName string `json:"courseName"`
	CourseUuid string `json:"courseUuid"`
}

type Lists struct {
	Courses []CourseItem `json:"courses"`
}

func GetCoursesList(userId any) (*Lists, error) {	
	var list []CourseItem

	err := db.DB.Table("enrollments").Select("courses.name AS course_name, courses.uuid AS course_uuid").Joins("JOIN courses ON enrollments.course_id = courses.id").Where("enrollments.student_id = ?", userId).Scan(&list).Error
	
	if err != nil {
		return nil, err 
	}

	result := &Lists {
		Courses: list,
	}

	return result, nil
}

func GetCourseDetails (userId any, Uuid any) (*Lists, error) {
	type Details struct {
		SubjectDetails string
		QuizName string
		QuizUuid string
	}
	
	var list []
}