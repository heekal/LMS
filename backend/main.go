package main

import (
	"log"
	"os"
	"backend/controllers"
	"backend/db"
	"backend/middleware"
	"backend/controllers/mahasiswaController"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	db.Connect()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", controllers.Login)
			auth.POST("/logout", controllers.Logout)
		}

		protected := api.Group("/")
		protected.Use(middleware.AuthRequired())
		{
			protected.GET("/me", controllers.GetMe)
			
			mahasiswa := protected.Group("/mahasiswa")
			mahasiswa.Use(middleware.RoleRequired("mahasiswa"))
			{
				mahasiswa.GET("/navbar", mahasiswaController.NavbarGetCourse)
				mahasiswa.GET("/dashboard", mahasiswaController.DahsboardGreetings)
				mahasiswa.GET("/dashboard/enrolled", mahasiswaController.DashboardCourses)
				mahasiswa.GET("/dashboard/tasks", mahasiswaController.DashboardTaskReminder)
			}

			{
				dosen := protected.Group("/dosen")
				dosen.Use(middleware.RoleRequired("dosen"))
			}
		}
	}

	port := os.Getenv("APP_PORT")

	log.Printf("🚀 Server running on http://localhost:%s\n", port)
	r.Run(":" + port)
}