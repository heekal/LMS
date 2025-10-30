package controllers

import (
	"net/http"
	"os"
	"time"
	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Message string   `json:"message"`
	User    UserData `json:"user"`
}

type UserData struct {
	Email string `json:"email"`
	Role  string `json:"role"`
	Id    int    `json:"id"`
	Name  string `json:"name"`
}

type Claims struct {
	UserID int    `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	Name   string `json:"name"`
	jwt.RegisteredClaims
}

func generateToken(user models.User) (string, error) {
	secret := os.Getenv("JWT_KEY")

	claims := Claims{
		UserID: user.Id,
		Email:  user.Email,
		Role:   user.Role,
		Name:   user.Name,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	
	tokenString, err := token.SignedString([]byte(secret))
	return tokenString, err
}

func Login(c *gin.Context) {
	var req LoginRequest
	var user models.User

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email dan password harus diisi",})
		return
	}

	result := db.DB.Where("email = ? AND password = ?", req.Email, req.Password).First(&user)
	
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau Password Salah!",})
		return
	}

	token, err := generateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat token",})
		return
	}

	c.SetCookie("auth_token", token, 3600*24, "/", "", false, true)

	c.JSON(http.StatusOK, LoginResponse{
		Message: "Login berhasil",
		User: UserData{
			Email: user.Email,
			Role:  user.Role,
			Id:    user.Id,
			Name:  user.Name,
		},
	})
}

// Endpoint buat cek user yang sedang login
func GetMe(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{ "error": "Unauthorized" })
		return
	}

	var user models.User
	if err := db.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{ "error": "User tidak ditemukan" })
		return
	}

	c.JSON(http.StatusOK, UserData{
		Email: user.Email,
		Role:  user.Role,
		Id:    user.Id,
		Name:  user.Name,
	})
}

func Logout(c *gin.Context) {
	c.SetCookie("auth_token", "", -1, "/", "", false, true,)

	c.JSON(http.StatusOK, gin.H{ "message": "Logout berhasil" })
}