package mahasiswaController

import (
	"net/http"
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

	res, err := models.GetCourseIdentityCode(userId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ "error" : "gagal mengambil data courses", "details" : err.Error()})
		return	
	}	

	c.JSON(http.StatusOK, gin.H{
		"Data" : res,
	})
}

func DashboardTaskReminder(c *gin.Context) {
	userId, exists := c.Get("user_id")
	
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	res, err := models.GetCourseTaskDeadline(userId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Data": res})
}
