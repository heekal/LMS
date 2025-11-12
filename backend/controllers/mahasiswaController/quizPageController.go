package mahasiswaController

import (
	"net/http"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func HandleQuizLanding (c *gin.Context) {
	_, exists := c.Get("user_id")
	quizUuid := c.Query("id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	result, err := models.GetQuizLanding(quizUuid)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result })
}

func ShowQuizQuestions (c *gin.Context) {
	_, exists := c.Get("user_id")
	quizUuid := c.Query("id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	result, err := models.GetQuizQuestions(quizUuid)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result })
}
