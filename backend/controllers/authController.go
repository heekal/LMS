package controllers

import (
	"fmt"
	"errors"
	"net/http"
	"backend/db"
	"backend/utils"
	"backend/models"
	"backend/services"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"
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

func Login(c *gin.Context) {
	var req LoginRequest
	var user models.User

	if err := c.ShouldBindJSON(&req); err != nil {
		c.Error(utils.NewApiError(http.StatusBadRequest, fmt.Errorf("Username and Password is Required!")))
		return
	}

	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
    // if userNotFound
		if errors.Is(err, gorm.ErrRecordNotFound) {
        c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Incorrect Email or Password!")))
        return
    }
		
    c.Error(err)
    return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))

	if err != nil {
			c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Incorrect Email or Password!")))
			return
	}

	token, err := services.GenerateToken(user)
	
	if err != nil {
		c.Error(utils.NewApiError(http.StatusInternalServerError, fmt.Errorf("Login Failed, Server is Busy!")))
		return
	}

	c.SetCookie("auth_token", token, 7200, "/", "", false, true)

	c.JSON(http.StatusOK, LoginResponse{
		Message: "Login Success!",
		User: UserData{
			Email: user.Email,
			Role:  user.Role,
			Id:    user.Id,
			Name:  user.Name,
		},
	})
}

func GetMe(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.Error(utils.NewApiError(http.StatusUnauthorized, fmt.Errorf("Sorry! You are not authorized to access this page!")))
		return
	}

	var user models.User
	if err := db.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.Error(utils.NewApiError(http.StatusNotFound, fmt.Errorf("Unable to Get User Data, Please Relogin!")))
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
	c.SetCookie("auth_token", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout Completed!"})
}