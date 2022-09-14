package models

type Room struct {
	Room_id   uint   `gorm:"primaryKey"`
	Room_name string `gorm:"type:text"`
}
