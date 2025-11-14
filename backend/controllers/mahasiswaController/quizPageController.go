package mahasiswaController

import (
	"fmt"
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

func HandleQuizSubmitPayload(c *gin.Context) {
	_, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var payload models.QuizSubmitPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("Received payload: %+v\n", payload)

	c.JSON(200, gin.H{"message": "Payload received"})
}