package main

import (
	"movieBackend/initializers"
	"movieBackend/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Test{})

}
