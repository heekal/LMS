package mahasiswaController

import (
	"fmt"
	"net/http"
	"backend/models"
	"backend/utils"
	
	"github.com/gin-gonic/gin"
)

func ShowScores (c *gin.Context) {
	userId, exists := c.Get("user_id")

	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this page!")))
		return
	}

	res, err := models.GetQuizScore(userId)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return	
	}	

	c.JSON(http.StatusOK, gin.H{
		"Data" : res,
	})
}