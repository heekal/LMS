package middleware

import (
	"net/http"
	"backend/utils"
	"github.com/gin-gonic/gin"
)

func ErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			err := c.Errors.Last().Err

			// err from database then can't be sent
			statusCode := http.StatusInternalServerError
			message := "Internal Server Error"

			// check if api error then show
			if apiErr, ok := err.(*utils.ApiError); ok {
				statusCode = apiErr.StatusCode
				message = apiErr.Message
			}

			c.JSON(statusCode, gin.H{
				"error": message,
			})
		}
	}
}