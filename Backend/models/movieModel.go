package models

type Movie struct {
	Movie_id           uint   `gorm:"primaryKey"`
	Movie_name         string `gorm:"type:text"`
	Viewing_date       string `gorm:"type:date"`
	Viewing_start_time string `gorm:"type:Time"`
	Viewing_end_time   string `gorm:"type:Time"`
	Image_url          string `gorm:"type:text"`
	Room_id_fk         uint
	Room               Room `gorm:"foreignKey:room_id_fk"`
}
