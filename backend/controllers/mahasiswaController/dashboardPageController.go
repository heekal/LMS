package mahasiswaController

import (
	"fmt"
	"net/http"
	"backend/models"
	"backend/utils"
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
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this component!")))
		return
	}

	res, err := models.GetCourseIdentityCode(userId)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return	
	}	

	c.JSON(http.StatusOK, gin.H{
		"Data" : res,
	})
}

func DashboardTaskReminder (c *gin.Context) {
	userId, exists := c.Get("user_id")

	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this component!")))
		return
	}

	res, err := models.GetCourseTaskDeadline(userId)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return	
	}	

	c.JSON(http.StatusOK, gin.H{"Data": res})
}
