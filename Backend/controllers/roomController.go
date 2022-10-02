package controllers

import (
	"movieBackend/initializers"
	"movieBackend/models"

	"github.com/gin-gonic/gin"
)

func RoomCreate(c *gin.Context) {

	var body struct {
		Room_name         string
		Row_count         uint
		Row_seat_quantity uint
	}

	c.Bind(&body)

	room := models.Room{

		Room_name:         body.Room_name,
		Row_count:         body.Row_count,
		Row_seat_quantity: body.Row_seat_quantity,
	}
	result := initializers.DB.Create(&room)

	//maak de stoelen aan op basis van de row count en row seat quantity
	//(zie seatController.go)

	//TODO : hier moet een transaction komen
	//als de stoelen niet aangemaakt kunnen worden moet de room ook niet aangemaakt worden
	//op dit moment wordt de room wel aangemaakt als de stoelen niet aangemaakt kunnen worden
	//dit is niet de bedoeling ;/

	var roomID uint = room.Room_id

	if !CreateSeats(roomID, body.Row_count, body.Row_seat_quantity) {
		c.Status(500)
		return
	}

	if result.Error != nil {
		c.Status(400)
		return
	}
	c.JSON(200, gin.H{
		"message": "room created successfully",
		"room":    room,
	})
}
func RoomIndex(c *gin.Context) {

	var rooms []models.Room

	initializers.DB.Find(&rooms)

	c.JSON(200, gin.H{
		"rooms": rooms,
	})

}

func RoomShow(c *gin.Context) {

	var room models.Room

	id := c.Param("id")

	initializers.DB.Raw("SELECT * FROM rooms WHERE room_id = ?", id).Scan(&room)

	c.JSON(200, gin.H{
		"room": room,
	})

}

func RoomUpdate(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		Room_name         string
		Row_count         uint
		Row_seat_quantity uint
	}

	c.Bind(&body)

	var room models.Room

	initializers.DB.First(&room, id)

	initializers.DB.Model(&room).Updates(
		models.Room{
			Room_name:         body.Room_name,
			Row_count:         body.Row_count,
			Row_seat_quantity: body.Row_seat_quantity,
		})

	initializers.DB.Save(&room)

	c.JSON(200, gin.H{
		"message": "room updated successfully",
		"room":    room,
	})
}

func RoomDelete(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Unscoped().Delete(&models.Room{}, id)

	c.JSON(200, gin.H{
		"message": "room deleted successfully",
	})
}
