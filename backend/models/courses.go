package models

import (
	"backend/db"
)

type CourseIdentity struct {
	CourseName string `json:"courseName"`
	CourseUuid string `json:"courseUuid"`
}

type CourseIdentityList struct {
	Courses []CourseIdentity `json:"courses"`
}

type CourseIdentityCode struct {
	CourseIdentity
	CourseCode string `json:"courseCode"`
}

type CourseIdentityCodeList struct {
	Courses []CourseIdentityCode `json:"courses"`
}

type CourseTaskDeadline struct {
	CourseIdentity
	PerQuizDeadlineTime
}

type GroupTaskPerCourse struct {
	CourseIdentity
	Quizzes []PerQuizDeadline `json:"quizzes"`
}

type CourseSubDetails struct {
	SubjectData
	PerQuizDeadline
}

type GroupCourseDetails struct {
	CourseIdentityCode
	UserAsInstructor
	CourseCode string `json:"courseCode"`
	CourseDesc string `json:"courseDesc"`
	Data []CourseSubDetails `json:"Data" gorm:"-"`
}

func GetCoursesList (userId any) (*CourseIdentityList, error) {	
	var list []CourseIdentity

	err := db.DB.Table("enrollments").Select("courses.name AS course_name, courses.uuid AS course_uuid").Joins("JOIN courses ON enrollments.course_id = courses.id").Where("enrollments.student_id = ?", userId).Scan(&list).Error
	
	if err != nil {
		return nil, err 
	}

	result := &CourseIdentityList {
		Courses: list,
	}

	return result, nil
}

func GetCourseIdentityCode (userId any) ([]CourseIdentityCode, error) {
	var list []CourseIdentityCode

	err := db.DB.Table("courses").Select("courses.name AS course_name	, courses.code AS course_code, courses.uuid AS course_uuid").Joins("JOIN enrollments ON enrollments.course_id = courses.id").Where("enrollments.student_id = ?", userId).Scan(&list).Error
	
	if err != nil {
		return nil, err 
	}

	return list, nil
}

func GetCourseTaskDeadline (userId any) ([]GroupTaskPerCourse, error) {
	var list []CourseTaskDeadline

	err := db.DB.Table("enrollments").
		Select(`
			courses.name AS course_name,
			courses.uuid AS course_uuid,
			quizzes.title AS quiz_name,
			quizzes.uuid AS quiz_uuid,
			quizzes.opened_at AS open_date,
			quizzes.deadline AS close_date
		`).
		Joins("JOIN courses ON enrollments.course_id = courses.id").
		Joins("JOIN quizzes ON courses.id = quizzes.course_id").
		Where("enrollments.student_id = ?", userId).
		Where("quizzes.opened_at <= NOW()").
		Scan(&list).Error

	if err != nil {
		return nil, err 
	}

	courseMap := make(map[string]GroupTaskPerCourse)
	for _, row := range list {
		c := courseMap[row.CourseName]
		c.CourseName = row.CourseName
		c.CourseUuid = row.CourseUuid
		c.Quizzes = append(c.Quizzes, PerQuizDeadline{
			QuizName:  row.QuizName,
			QuizUuid:  row.QuizUuid,
			OpenDate:  row.OpenDate.UTC().Format("02/01/06, 15:04"),
			CloseDate: row.CloseDate.UTC().Format("02/01/06, 15:04"),
		})
		courseMap[row.CourseName] = c
	}

	var result []GroupTaskPerCourse

	for _, data := range courseMap {
		result = append(result, data)
	}

	return result, nil
}

func GetCourseDetails(userId any, uuid any) ([]GroupCourseDetails, error) {

	// Ambil course + instructor
	var course GroupCourseDetails

	err := db.DB.Table("courses c").
		Select(`
			c.name AS course_name,
			c.uuid AS course_uuid,
			c.description AS course_desc,
			u.name AS instructor_name,
			c.code AS course_code
		`).
		Joins("JOIN users u ON c.dosen_id = u.id").
		Where("c.uuid = ?", uuid).
		Scan(&course).Error

	if err != nil {
		return nil, err
	}

	// Ambil material + quizzes
	var data []CourseSubDetails

	err = db.DB.Table("materials m").
		Select(`
			m.title AS subject_name,
			m.description AS subject_desc,
			q.title AS quiz_name,
			q.uuid AS quiz_uuid,
			q.opened_at AS open_date,
			q.deadline AS close_date
		`).
		Joins("LEFT JOIN quizzes q ON q.course_id = m.course_id").
		Joins("JOIN courses c ON c.id = m.course_id").
		Where("c.uuid = ?", uuid).
		Order("m.id, q.opened_at").
		Scan(&data).Error

	if err != nil {
		return nil, err
	}

	course.Data = data
	return []GroupCourseDetails{course}, nil
}
