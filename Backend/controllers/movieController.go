package controllers

import (
	"movieBackend/initializers"
	"movieBackend/models"

	"github.com/gin-gonic/gin"
)

func MovieCreate(c *gin.Context) {

	var body struct {
		Movie_name         string
		Viewing_date       string
		Viewing_start_time string
		Viewing_end_time   string
		Image_url          string
		Room_id_fk         uint
	}

	c.Bind(&body)

	movie := models.Movie{
		Movie_name:         body.Movie_name,
		Viewing_date:       body.Viewing_date,
		Viewing_start_time: body.Viewing_start_time,
		Viewing_end_time:   body.Viewing_end_time,
		Image_url:          body.Image_url,
		Room_id_fk:         body.Room_id_fk,
	}

	//TODO : hier moet een transaction komen
	//als de tickets niet aangemaakt kunnen worden moet de movie ook niet aangemaakt worden
	//op dit moment wordt de movie wel aangemaakt als de tickets niet aangemaakt kunnen worden
	//dit is niet de bedoeling ;/

	result := initializers.DB.Create(&movie)

	var movieID uint = movie.Movie_id
	var roomID uint = movie.Room_id_fk

	var seats []models.Seat

	initializers.DB.Raw("SELECT * FROM seats WHERE room_id_fk = ?", body.Room_id_fk).Scan(&seats)

	if !CreateTickets(movieID, roomID, seats) {
		c.Status(500)
		return
	}

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"message": "movie created successfully",
		"movie":   movie,
	})

}

func MovieIndex(c *gin.Context) {

	var Movies []models.Movie

	initializers.DB.Find(&Movies)

	c.JSON(200, gin.H{
		"Movies": Movies,
	})

}
func GetRoomName(id uint) string {
	var RoomName string
	initializers.DB.Raw("SELECT room_name FROM rooms WHERE room_id = ?", id).Scan(&RoomName)
	return RoomName
}
func MovieShow(c *gin.Context) {
	type MovieResStruct struct {
		Movie    models.Movie
		RoomName string
	}
	RoomName := ""

	var Movie models.Movie

	id := c.Param("id")

	initializers.DB.Raw("SELECT * FROM movies WHERE movie_id = ?", id).Scan(&Movie)

	roomId := Movie.Room_id_fk

	initializers.DB.Raw("SELECT room_name FROM rooms WHERE room_id = ?", roomId).Scan(&RoomName)

	MoviesRes := MovieResStruct{
		Movie:    Movie,
		RoomName: RoomName,
	}

	c.JSON(200, gin.H{
		"Movie": MoviesRes,
	})

}

func MovieUpdate(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		Movie_name         string
		Viewing_date       string
		Viewing_start_time string
		Viewing_end_time   string
		Image_url          string
		Room_id_fk         uint
	}

	c.Bind(&body)

	var Movie models.Movie

	initializers.DB.First(&Movie, id)

	initializers.DB.Model(&Movie).Updates(
		models.Movie{
			Movie_name:         body.Movie_name,
			Viewing_date:       body.Viewing_date,
			Viewing_start_time: body.Viewing_start_time,
			Viewing_end_time:   body.Viewing_end_time,
			Image_url:          body.Image_url,
			Room_id_fk:         body.Room_id_fk,
		})

	initializers.DB.Save(&Movie)

	c.JSON(200, gin.H{
		"message": "Movie updated successfully",
		"Movie":   Movie,
	})
}

func MovieDelete(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Unscoped().Delete(&models.Movie{}, id)

	c.JSON(200, gin.H{
		"message": "Movie deleted successfully",
	})
}
