package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": c.Errors[0].Error(),
			})
		}
	}
}
