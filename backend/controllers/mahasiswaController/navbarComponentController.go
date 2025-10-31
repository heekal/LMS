package mahasiswaController

import (
	"net/http"
	"backend/models"
	
	"github.com/gin-gonic/gin"
)

func NavbarGetCourse (c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{ "error": "Unauthorized" })
		return
	}

	res, err := models.GetEnrolledCoursesList(userId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ "error" : "gagal mengambil data courses", "details" : err.Error()})
		return	
	}	

	c.JSON(http.StatusOK, gin.H{ "courses" : res })
}