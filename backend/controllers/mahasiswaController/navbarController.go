package mahasiswaController

import (
	"net/http"
	"backend/db"
	"backend/models"
	
	"github.com/gin-gonic/gin"
)

func NavbarGetCourse (c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{ "error": "Unauthorized" })
		return
	}

	var enrolled_courses []models.EnrollmentsForNavbar
	res := db.DB.Table("courses").Select("courses.name AS name, courses.uuid as uuid").Joins("JOIN enrollments ON enrollments.course_id = courses.id").Where("enrollments.student_id = ?", userId).Scan(&enrolled_courses)

	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ "error" : "gagal mengambil data courses", "details" : res.Error.Error()})
		return	
	}	

	c.JSON(http.StatusOK, gin.H{
		"courses" : enrolled_courses,
	})
}