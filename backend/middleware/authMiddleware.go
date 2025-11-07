package middleware

import (
	"net/http"
	"backend/db"
	"backend/services"

	"github.com/gin-gonic/gin"
)

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("auth_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token tidak ditemukan"})
			c.Abort()
			return
		}

		claims, err := services.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token tidak valid"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("user_email", claims.Email)
		c.Set("user_role", claims.Role)
		c.Set("user_name", claims.Name)

		c.Next()
	}
}

func RoleRequired(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("user_role")
		if !exists {
			c.JSON(http.StatusForbidden, gin.H{ "error": "Role tidak ditemukan" })
			c.Abort()
			return
		}

		userRole := role.(string)
		allowed := false
		for _, r := range allowedRoles {
			if userRole == r {
				allowed = true
				break
			}
		}

		if !allowed {
			c.JSON(http.StatusForbidden, gin.H{ "error": "Akses ditolak. Anda tidak punya hak akses" })
			c.Abort()
			return
		}

		c.Next()
	}
}

func IsEnrolled() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, _ := c.Get("user_id")
		uuid := c.Param("uuid")

		var isEnrolled bool
		err := db.DB.Raw(`
			SELECT EXISTS (
				SELECT 1 FROM enrollments e
				JOIN courses c ON c.id = e.course_id
				WHERE e.student_id = ? AND c.uuid = ?
			)
		`, userId, uuid).Scan(&isEnrolled).Error

		if err != nil || !isEnrolled {
			c.JSON(http.StatusForbidden, gin.H{"error": "You are not enrolled in this course"})
			c.Abort()
			return
		}

		c.Next()
	}
}

func IsStarted() gin.HandlerFunc {
	return func(c *gin.Context) {
		quizUuid := c.Param("quizUuid")

		var available bool
		err := db.DB.Raw(`
			SELECT EXISTS (
				SELECT 1
				FROM quizzes
				WHERE uuid = ?
				AND opened_at <= NOW()
				AND deadline >= NOW()
			)
		`, quizUuid).Scan(&available).Error

		if err != nil {
			c.AbortWithStatusJSON(500, gin.H{"error": "database error"})
			return
		}

		if !available {
			c.AbortWithStatusJSON(403, gin.H{"error": "quiz is not available"})
			return
		}

		c.Next()
	}
}