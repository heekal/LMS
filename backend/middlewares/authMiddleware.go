package middleware

import (
	"fmt"
	"strings"
	"net/http"
	"backend/db"
	"backend/services"
	"backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func AuthRequired() gin.HandlerFunc {
  return func(c *gin.Context) {
    var tokenString string

    // PRIORITAS: Bearer Token (ZAP / CI / API)
    authHeader := c.GetHeader("Authorization")
    if strings.HasPrefix(authHeader, "Bearer ") {
      tokenString = strings.TrimPrefix(authHeader, "Bearer ")
    } else {
      // FALLBACK: Cookie (Browser)
      cookie, err := c.Cookie("auth_token")
      if err != nil {
        c.AbortWithStatusJSON(401, gin.H{
          "error": "Token not found",
        })
        return
      }
      tokenString = cookie
    }

    claims, err := services.ValidateToken(tokenString)
    if err != nil {
      c.AbortWithStatusJSON(401, gin.H{
        "error": "Invalid or expired token",
      })
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
			c.Error(utils.NewApiError(http.StatusForbidden, fmt.Errorf("Role Not Found, Please Relogin!")))
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
			c.Error(utils.NewApiError(http.StatusForbidden, fmt.Errorf("Access Denied, You Are Not Allowed")))
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
			c.Error(utils.NewApiError(http.StatusForbidden, fmt.Errorf("You Are Not Enrolled in This Course!")))
			c.Abort()
			return
		}

		c.Next()
	}
}

func IsAllowed() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, _ := c.Get("user_id")
		quizUuid := c.Query("id")

		if quizUuid == "" {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "missing quiz id"})
			return
		}

		if _, err := uuid.Parse(quizUuid); err != nil {
			c.AbortWithStatusJSON(400, gin.H{"error": "invalid quiz id"})
			return
		}

		// check if user ngambil course 
		var enrolled bool
		err := db.DB.Raw(`
			SELECT EXISTS (
				SELECT 1
				FROM enrollments e
				INNER JOIN quizzes q ON e.course_id = q.course_id
				WHERE e.student_id = ?
				AND q.uuid = ?
			)
		`, userId, quizUuid).Scan(&enrolled).Error

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}
		
		if !enrolled {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "user not enrolled in this course"})
			return
		}

		// check if course dibuka
		var available bool
		err = db.DB.Raw(`
			SELECT EXISTS (
				SELECT 1
				FROM quizzes
				WHERE uuid = ?
				AND opened_at <= NOW()
				AND deadline >= NOW()
			)
		`, quizUuid).Scan(&available).Error

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		if !available {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "quiz not available"})
			return
		}

		c.Next()
	}
}

func CanSubmitQuiz() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, exists := c.Get("user_id")
		
		if !exists {
			c.JSON(http.StatusForbidden, gin.H{ "error": "User Tidak Ditemukan" })
			c.Abort()
			return
		}

		quizUuid := c.Query("id")

		// check if user udah submit sebelumnya atau belum
		var canSubmit bool
		err := db.DB.Raw(`
		SELECT EXISTS (
			SELECT 1
			FROM quizresults
			JOIN quizzes on quizresults.quiz_id = quizzes.id
			WHERE quizresults.user_id = ?
			AND quizzes.uuid = ?
		)`, userId, quizUuid).Scan(&canSubmit).Error

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		if canSubmit {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "user has already finished the assigment"})
			return
		}

		c.Next()
	}
}