package mahasiswaController

import (
	"fmt"
	"net/http"
	"backend/models"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func ShowCourseList (c *gin.Context) {
	userId, exist := c.Get("user_id")
	if !exist {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this course!")))
		return
	}

	result, err := models.GetCoursesList(userId)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":result})
}

func ShowCourseDetails(c *gin.Context) {
	userId, exist := c.Get("user_id")
	if !exist {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this course!")))
		return
	}

	courseUuid := c.Param("uuid")
	res, err := models.GetCourseDetails(userId, courseUuid)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": res})
}
