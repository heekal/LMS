package mahasiswaController

import (
    "github.com/gin-gonic/gin"
)

func MahasiswaDashboard(c *gin.Context) {
    userName := c.GetString("user_name")

    c.JSON(http.StatusOK, gin.H{
			"name": userName,
    })
}