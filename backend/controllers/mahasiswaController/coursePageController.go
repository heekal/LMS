package mahasiswaController

import (
	"net/http"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func ShowCourseList (c *gin.Context) {
	userId, exist := c.Get("user_id")
	if !exist {
		c.JSON(http.StatusUnauthorized, gin.H{"error":"Unauthorized"})
		return
	}

	result, err := models.GetCoursesList(userId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":result})
}

func ShowCourseDetails (c *gin.Context)