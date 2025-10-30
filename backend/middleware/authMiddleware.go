package middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	UserID int    `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	Name 	 string `json:"name"`
	jwt.RegisteredClaims
}

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("auth_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{ "error": "Token tidak ditemukan" })
			c.Abort()
			return
		}

		secret := os.Getenv("JWT_KEY")

		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{ "error": "Token tidak valid" })
			c.Abort()
			return
		}

		claims, ok := token.Claims.(*Claims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{ "error": "Token tidak valid" })
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