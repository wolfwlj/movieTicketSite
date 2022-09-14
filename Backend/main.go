package main

import (
	"movieBackend/controllers"
	"movieBackend/initializers"
	"movieBackend/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectDB()
	initializers.SyncDatabase()

}
func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:8080"},
		AllowMethods: []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		//allow localhost:8080 to access the server
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "X-Requested-With", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// router.GET("/test", controllers.KlasCreate)
	router.GET("/test", controllers.Test)
	// user router : --------------------------------------------------------------

	router.POST("/signup", controllers.Signup)
	router.POST("/login", controllers.Login)

	// protected user routes : -----------------------------------------------------
	router.GET("/validate", middleware.RequireAuth, controllers.Validate)
	router.POST("/logout", middleware.RequireAuth, controllers.Logout)

	//-------------------End of user routes----------------------------------------
	router.Run(":9090")
}
