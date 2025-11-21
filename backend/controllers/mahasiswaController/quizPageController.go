package mahasiswaController

import (
	"fmt"
	"net/http"
	"backend/models"
	"backend/utils"

	"github.com/gin-gonic/gin"
)


func HandleQuizLanding (c *gin.Context) {
	_, exists := c.Get("user_id")

	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this page!")))
		return
	}

	quizUuid := c.Query("id")
	result, err := models.GetQuizLanding(quizUuid)

	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return	
	}	

	c.JSON(http.StatusOK, gin.H{"data": result })
}

func ShowQuizQuestions (c *gin.Context) {
	_, exists := c.Get("user_id")
	quizUuid := c.Query("id")

	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this page!")))
		return
	}

	result, err := models.GetQuizQuestions(quizUuid)
	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Internal Server Error")))
		return	
	}	

	c.JSON(http.StatusOK, gin.H{"data": result })
}

func HandleQuizSubmitPayload (c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry you are not authorized to access this page!")))
		return
	}

	var payload models.QuizSubmitPayload
	
	// check if format payload sesuai dgn yg dikirim
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// check apakah quizId yg dikirim valid
	var isValid bool
	isValid, err := models.CheckQuizId(userId, payload.QuizID)

	if err != nil {
		fmt.Printf(err.Error())
		c.JSON(404, gin.H{"error" : err.Error()})
		return
	}

	if !isValid {
		c.JSON(404, gin.H{"error" : "Unauthorized"})
		return
	}
	
	// lakukan penilaian
	err = models.HandleQuizGrading(userId, payload.QuizID, payload.Answers)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Submitted"})
}