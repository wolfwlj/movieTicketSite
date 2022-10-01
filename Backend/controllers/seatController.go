package controllers

import (
	"fmt"
	"movieBackend/initializers"
	"movieBackend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

//dit is een helper functie voor de room create functie, hier worden de seats aangemaakt op basis van-
// de row count en row seat quantity

var i uint
var j uint
var countPowerOf26 uint = 0
var firstLetterRune rune

func toChar(i uint) string {
	if i < 26 {
		firstRune := rune('A' + i)
		return string(firstRune)
	}
	if i%26 == 0 {
		countPowerOf26 += 1
		firstLetterRune = rune('A' + countPowerOf26 - 1)
	}
	// case hieronder is voor als er meer dan 26 rijen zijn
	secondLetterRune := rune('A' + i%26)
	// return rune('A' + (i % 26))
	return string(firstLetterRune) + string(secondLetterRune)

}
func CreateSeats(roomID uint, row_count uint, row_seat_quantity uint) bool {
	//for loop voor de rijen
	for i = 0; i < row_count; i++ {
		rowLetter := toChar(i)
		//for loop voor de stoelen

		for j = 0; j < row_seat_quantity; j++ {
			seatName := rowLetter + fmt.Sprint(j+1)
			seat := models.Seat{
				Seat_name:         seatName,
				Reservation_state: "available",
				Room_id_fk:        roomID,
			}

			result := initializers.DB.Create(&seat)

			if result.Error != nil {
				return false
			}
		}
	}

	return true
	// Weet niet zeker of het de beste implementatie is, maar ben er wel tevreden mee
}

func ReserveSeat(c *gin.Context) {

	var body struct {
		Seat_id  uint
		User_id  uint
		Movie_id uint
	}

	c.Bind(&body)

	println(c.Request)

	var seat models.Seat
	initializers.DB.First(&seat, body.Seat_id)

	if seat.Reservation_state == "available" {
		seat.Reservation_state = "reserved"
		initializers.DB.Save(&seat)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "seat has already been reserved",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "seat reserved",
		"seat":    seat,
		"user_id": body.User_id,
		"movie":   body.Movie_id,
		"room_id": seat.Room_id_fk,
	})

}

func SeatIndex(c *gin.Context) {
	type rowsCollumns struct {
		Row_count         uint
		Row_seat_quantity uint
	}
	type SeatResStruct struct {
		Id                uint
		Seat_name         string
		Reservation_state string
		Room_id_fk        uint
		AmountRows        uint
		AmountSeatsPerRow uint
	}

	var Seats []SeatResStruct
	var rowsCollumnsTemp rowsCollumns

	id := c.Param("id")

	initializers.DB.Raw("SELECT id, seat_name, reservation_state, room_id_fk  FROM seats WHERE room_id_fk = ?", id).Scan(&Seats)

	initializers.DB.Raw("SELECT room_id, row_count, row_seat_quantity FROM rooms WHERE room_id = ?", id).Scan(&rowsCollumnsTemp)

	c.JSON(200, gin.H{
		"Seats":    Seats,
		"Quantity": rowsCollumnsTemp,
	})

	// var Seats []models.Seat
	// id := c.Param("id")

	// initializers.DB.Raw("SELECT id, seat_name, reservation_state, room_id_fk  FROM seats WHERE room_id_fk = ?", id).Scan(&Seats)

	// c.JSON(200, gin.H{
	// 	"Seats": Seats,
	// })

}
