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

	result := initializers.DB.Create(&movie)

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

func MovieShow(c *gin.Context) {

	var Movie models.Movie

	id := c.Param("id")

	initializers.DB.Raw("SELECT * FROM movies WHERE movie_id = ?", id).Scan(&Movie)

	c.JSON(200, gin.H{
		"Movie": Movie,
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
