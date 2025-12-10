package services

import (
	"backend/db" // Pastikan import path ini sesuai dengan go.mod kamu
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type HealthResponse struct {
	Status    string `json:"status"`
	Database  string `json:"database"`
	Timestamp string `json:"timestamp"`
}

func HealthCheck(c *gin.Context) {
	resp := HealthResponse{
		Status:    "UP",
		Database:  "connected",
		Timestamp: time.Now().Format(time.RFC3339),
	}
	httpStatus := http.StatusOK

	// Mengambil instance sql.DB dari GORM variable 'DB' yang ada di package 'db'
	sqlDB, err := db.DB.DB()
	
	if err != nil {
		resp.Status = "DOWN"
		resp.Database = "error getting instance: " + err.Error()
		httpStatus = http.StatusInternalServerError
	} else if err := sqlDB.Ping(); err != nil {
		// Ping gagal (DB mati/putus)
		resp.Status = "DOWN"
		resp.Database = "disconnected: " + err.Error()
		httpStatus = http.StatusInternalServerError
	}

	c.JSON(httpStatus, resp)
}