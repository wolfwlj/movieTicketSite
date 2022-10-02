package models

import "gorm.io/gorm"

type Ticket struct {
	gorm.Model
	Reservation_state string `gorm:"default:'available';type:text"` // "reserved" or "available"
	Room_id_fk        uint
	Room              Room `gorm:"foreignKey:room_id_fk"`
	User_id_fk        *uint
	User              User `gorm:"foreignKey:user_id_fk"`
	Movie_id_fk       uint
	Movie             User `gorm:"foreignKey:movie_id_fk"`
	Seat_id_fk        uint
	Seat              User `gorm:"foreignKey:seat_id_fk"`
}
