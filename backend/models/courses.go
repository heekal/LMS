package models

import (
	"backend/db"

	"gorm.io/gorm"
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

type GroupedSubject struct {
	SubjectData
	QuizzesInfo  []PerQuizDeadlineStatus `json:"quizzesInfo" gorm:"-"`
}

type GroupCourseDetails struct {
	CourseIdentityCode
	UserAsInstructor
	CourseCode string `json:"courseCode"`
	CourseDesc string `json:"courseDesc"`
	SubjectInfo []GroupedSubject `json:"subjectInfo" gorm:"-"`
}

type CourseSubDetails struct {
	SubjectData
	PerQuizDeadlineTime
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

	err := db.DB.Raw(`
		SELECT
			courses.name AS course_name, 
			courses.uuid AS course_uuid, 
			quizzes.title AS quiz_name, 
			quizzes.uuid AS quiz_uuid, 
			quizzes.id AS quiz_id,
			quizzes.opened_at AS open_date, 
			quizzes.deadline AS close_date
		FROM enrollments
		JOIN courses ON enrollments.course_id = courses.id
		JOIN quizzes ON courses.id = quizzes.course_id
		WHERE enrollments.student_id = ? 
		AND quizzes.opened_at <= NOW() 
		AND quizzes.deadline >= NOW()
		AND NOT EXISTS (
			SELECT 1
			FROM quizresults
			WHERE quizresults.quiz_id = quizzes.id
			AND quizresults.user_id = ?
		)`, userId, userId).Scan(&list).Error

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

func GetCourseDetails(userId any, uuid any) (*GroupCourseDetails, error) {
	var course GroupCourseDetails

	err := db.DB.Table("courses c").
		Select(`
			c.name AS course_name, 
			c.uuid AS course_uuid, 
			c.description AS course_desc, 
			c.code AS course_code, 
			u.name AS instructor_name`).
		Joins("JOIN users u ON c.dosen_id = u.id").
		Joins("JOIN enrollments AS e ON e.course_id = c.id AND e.student_id = ?", userId).
		Where("c.uuid = ?", uuid).
		Scan(&course).Error

	if err != nil {
		return nil, err
	}

	if course.CourseCode == "" {
		return nil, gorm.ErrRecordNotFound
	}

	var flat []struct {
		MaterialID  int     `json:"materialId"`
		SubjectName string  `json:"subjectName"`
		SubjectDesc string  `json:"subjectDesc"`
		QuizName    *string `json:"quizName"`
		QuizUuid    *string `json:"quizUuid"`
		OpenDate    *string `json:"openDate"`
		CloseDate   *string `json:"closeDate"`
		IsActive    *bool   `json:"isActive"`
		Status      *string `json:"status"`
	}

	err = db.DB.Table("materials AS m").
		Select(`
			m.id AS material_id,
			m.title AS subject_name,
			m.description AS subject_desc,
			q.title AS quiz_name,
			q.uuid AS quiz_uuid,
			TO_CHAR(q.opened_at, 'DD/MM/YY, HH24:MI') AS open_date,
			TO_CHAR(q.deadline, 'DD/MM/YY, HH24:MI') AS close_date,
			CASE
				WHEN q.opened_at <= NOW() AND q.deadline >= NOW() THEN true
				ELSE false
			END AS is_active,
			CASE
				WHEN q.opened_at > NOW() THEN 'upcoming'
				WHEN q.opened_at <= NOW() AND q.deadline >= NOW() THEN 'active'
				WHEN q.deadline < NOW() THEN 'closed'
				ELSE NULL
			END AS status
		`).
		Joins("JOIN courses AS c ON c.id = m.course_id").
		Joins("LEFT JOIN quizzes AS q ON q.id = m.id").
		Where("c.uuid = ?", uuid).
		Order("m.id, q.opened_at NULLS LAST").
		Scan(&flat).Error

	if err != nil {
		return nil, err
	}

	subjectMap := map[int]*GroupedSubject{}
	var materialOrder []int

	for _, row := range flat {
		if _, exists := subjectMap[row.MaterialID]; !exists {
			subjectMap[row.MaterialID] = &GroupedSubject{
				SubjectData: SubjectData{
					SubjectName: row.SubjectName,
					SubjectDesc: row.SubjectDesc,
				},
				QuizzesInfo: []PerQuizDeadlineStatus{},
			}
			materialOrder = append(materialOrder, row.MaterialID)
		}

		if row.QuizUuid != nil && row.Status != nil {
			subjectMap[row.MaterialID].QuizzesInfo = append(
				subjectMap[row.MaterialID].QuizzesInfo,
				PerQuizDeadlineStatus{
					QuizName:  *row.QuizName,
					QuizUuid:  *row.QuizUuid,
					OpenDate:  *row.OpenDate,
					CloseDate: *row.CloseDate,
					IsActive:  *row.IsActive,
					Status:    *row.Status,
				},
			)
		}
	}

	for _, matID := range materialOrder {
		course.SubjectInfo = append(course.SubjectInfo, *subjectMap[matID])
	}

	return &course, nil
}