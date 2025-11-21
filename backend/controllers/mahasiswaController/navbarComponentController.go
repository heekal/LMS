package mahasiswaController

import (
	"fmt"
	"net/http"
	"backend/models"
	"backend/utils"
	"github.com/gin-gonic/gin"
)

func NavbarGetCourse (c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this content!")))
		return
	}

	res, err := models.GetEnrolledCoursesList(userId)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return	
	}	

	c.JSON(http.StatusOK, gin.H{ "courses" : res })
}