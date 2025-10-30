package models

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
	Id       int    `json:"id"`
	Name     string `json:"name"`
}
