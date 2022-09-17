package models

type Room struct {
	Room_id           uint   `gorm:"primaryKey"`
	Room_name         string `gorm:"type:text"`
	Row_count         uint   `gorm:"type:int"`
	Row_seat_quantity uint   `gorm:"type:int"`
}
