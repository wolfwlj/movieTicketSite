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
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		//allow localhost:8080 to access the server
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "X-Requested-With", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// router.GET("/test", controllers.KlasCreate)
	router.GET("/test", controllers.Test)

	// auth router : --------------------------------------------------------------
	router.POST("/signup", controllers.Signup)
	router.POST("/login", controllers.Login)

	// protected auth routes :
	router.GET("/validate", middleware.RequireAuth, controllers.Validate)
	router.POST("/logout", middleware.RequireAuth, controllers.Logout)
	//-------------------End of auth routes----------------------------------------

	// room route(s) : -----------------------------------------------------------
	router.POST("/room", middleware.RequireAuth, controllers.RoomCreate)
	router.GET("/room", middleware.RequireAuth, controllers.RoomIndex)
	router.GET("/room/:id", middleware.RequireAuth, controllers.RoomShow)
	router.PUT("/room/:id", middleware.RequireAuth, controllers.RoomUpdate)
	router.DELETE("/room/:id", middleware.RequireAuth, controllers.RoomDelete)
	// ------- End of lessen routes -----------------------------------------------

	// movie route(s) : -----------------------------------------------------------
	router.POST("/movie", middleware.RequireAuth, controllers.MovieCreate)
	router.GET("/movie", middleware.RequireAuth, controllers.MovieIndex)
	router.GET("/movie/:id", middleware.RequireAuth, controllers.MovieShow)
	router.PUT("/movie/:id", middleware.RequireAuth, controllers.MovieUpdate)
	router.DELETE("/movie/:id", middleware.RequireAuth, controllers.MovieDelete)
	// ------- End of movie routes -----------------------------------------------

	// seat route(s) : -----------------------------------------------------------
	router.POST("/seat", middleware.RequireAuth, controllers.ReserveSeat)
	// ------- End of movie routes -----------------------------------------------

	router.Run(":9090")
}
