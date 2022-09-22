package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username   string `gorm:"unique;type:varchar(255)"`
	Password   string `json:"-"`
	Email      string `gorm:"unique;type:text"`
	First_name string `gorm:"type:text"`
	Last_name  string `gorm:"type:text"`
	Birthdate  string `gorm:"type:date"`
}
