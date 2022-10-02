package initializers

import "movieBackend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.Test{})
	DB.AutoMigrate(&models.Movie{})
	DB.AutoMigrate(&models.Room{})
	DB.AutoMigrate(&models.Seat{})
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Ticket{})

}
