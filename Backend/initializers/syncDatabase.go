package initializers

import "movieBackend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.Test{})

}
