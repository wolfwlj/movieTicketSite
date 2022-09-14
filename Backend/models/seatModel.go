package models

import "gorm.io/gorm"

type Seat struct {
	gorm.Model
	Seat_name         string `gorm:"type:text"`
	Reservation_state string `gorm:"default:'reserved';type:text"` // "reserved" or "available"
	Room_id_fk        uint
	Room              Room `gorm:"foreignKey:room_id_fk"`
	Movie_id_fk       uint
	Movie             Movie `gorm:"foreignKey:movie_id_fk"`
	User_id_fk        uint
	User              User `gorm:"foreignKey:user_id_fk"`
}
