package models

import "gorm.io/gorm"

type Test struct {
	gorm.Model
	Naam string
}
