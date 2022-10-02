package models

import "gorm.io/gorm"

type Seat struct {
	gorm.Model
	Seat_name  string `gorm:"type:text"`
	Room_id_fk uint
	Room       Room `gorm:"foreignKey:room_id_fk"`
}
