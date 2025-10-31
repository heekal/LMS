package mahasiswaController

import (
	"time"
	"net/http"
	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func DahsboardGreetings (c *gin.Context) {
	userName := c.GetString("user_name")

	c.JSON(http.StatusOK, gin.H{
		"name": userName,
	})
}

func DashboardCourses (c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{ "error": "Unauthorized" })
		return
	}

	var enrolled_courses []models.EnrollmentsResponse
	res := db.DB.Table("courses").Select("courses.name AS name, courses.code AS code, courses.uuid as uuid").Joins("JOIN enrollments ON enrollments.course_id = courses.id").Where("enrollments.student_id = ?", userId).Scan(&enrolled_courses)

	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ "error" : "gagal mengambil data courses", "details" : res.Error.Error()})
		return	
	}	

	c.JSON(http.StatusOK, gin.H{
		"courses" : enrolled_courses,
	})
}

func DashboardTaskReminder(c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	type JoinedResult struct {
		CourseName string
		CourseUuid string
		QuizName   string
		QuizUuid   string
		OpenDate   time.Time
		CloseDate  time.Time
	}

	var joined []JoinedResult

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
		Scan(&joined).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	type CourseData struct {
		Uuid    string
		Quizzes []models.QuizzesReminder
	}

	courseMap := make(map[string]CourseData)

	for _, row := range joined {
		c := courseMap[row.CourseName]
		c.Uuid = row.CourseUuid
		c.Quizzes = append(c.Quizzes, models.QuizzesReminder{
			QuizName:  row.QuizName,
			QuizUuid:  row.QuizUuid,
			OpenDate:  row.OpenDate.UTC().Format("02/01/06, 15:04"),
			CloseDate: row.CloseDate.UTC().Format("02/01/06, 15:04"),
		})
		courseMap[row.CourseName] = c
	}

	var result []models.CourseNameForTask
	for course, data := range courseMap {
		result = append(result, models.CourseNameForTask{
			CourseName: course,
			CourseUuid: data.Uuid,
			Quizzes:    data.Quizzes,
		})
	}

	c.JSON(http.StatusOK, gin.H{"Data": result})
}
