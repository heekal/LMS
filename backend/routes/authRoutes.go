package routes

import (
	"backend/controllers"
	"net/http"
)

func RegisterRoutes() {
	http.HandleFunc("/login", controllers.Login)
}