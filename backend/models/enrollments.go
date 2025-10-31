package models

import (
	"backend/db"
)

type EnrolledCourseIdentity struct {
	CourseName string `json:"courseName"`
	CourseUuid string `json:"courseUuid"`
	CourseCode string `json:"courseCode"`
}

type EnrolledCourseIdentityList struct {
	Courses []EnrolledCourseIdentity `json:"courses"`
}

func GetEnrolledCoursesList(userId any) ([]EnrolledCourseIdentity, error) {
	var enrolled []EnrolledCourseIdentity

	err := db.DB.Table("enrollments").
		Select("courses.name AS course_name, courses.uuid AS course_uuid, courses.code AS course_code").
		Joins("JOIN courses ON enrollments.course_id = courses.id").
		Where("enrollments.student_id = ?", userId).
		Find(&enrolled).Error

	if err != nil {
		return nil, err
	}

	return enrolled, nil
}