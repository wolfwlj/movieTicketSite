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
		Room_id_fk         uint
	}

	c.Bind(&body)

	movie := models.Movie{
		Movie_name:         body.Movie_name,
		Viewing_date:       body.Viewing_date,
		Viewing_start_time: body.Viewing_start_time,
		Viewing_end_time:   body.Viewing_end_time,
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
