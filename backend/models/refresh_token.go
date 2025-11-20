package models

import "time"

type RefreshToken struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    int       `gorm:"index;not null"`
	TokenHash string    `gorm:"size:512;not null;uniqueIndex"`
	JTI       string    `gorm:"size:128;index"`
	ExpiresAt time.Time `gorm:"not null"`
	Revoked   bool      `gorm:"default:false"`
	CreatedAt time.Time
}