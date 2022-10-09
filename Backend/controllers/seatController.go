package controllers

import (
	"fmt"
	"movieBackend/initializers"
	"movieBackend/models"

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
				Seat_name:  seatName,
				Room_id_fk: roomID,
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

// func ReserveSeat(c *gin.Context) {

// 	var body struct {
// 		Seat_id  uint
// 		User_id  uint
// 		Movie_id uint
// 	}

// 	c.Bind(&body)

// 	println(c.Request)

// 	var ticket models.Ticket
// 	initializers.DB.First(&ticket, body.Seat_id)

// 	if ticket.Reservation_state == "available" {

// 		ticket.Reservation_state = "reserved"
// 		ticket.User_id_fk = &body.User_id
// 		ticket.Movie_id_fk = body.Movie_id

// 		initializers.DB.Save(&ticket)
// 	} else if ticket.Reservation_state == "reserved" {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"message": "seat has already been reserved",
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "seat reserved",
// 		"ticket":  ticket,
// 		"user_id": body.User_id,
// 		"movie":   body.Movie_id,
// 		"room_id": ticket.Room_id_fk,
// 	})

// }

func SeatIndex(c *gin.Context) {
	// type rowsCollumns struct {
	// 	Row_count         uint
	// 	Row_seat_quantity uint
	// }
	// type SeatResStruct struct {
	// 	Id                uint
	// 	Seat_name         string
	// 	Room_id_fk        uint
	// 	Reservation_state string
	// }

	// var Seats []SeatResStruct
	// var rowsCollumnsTemp rowsCollumns
	// var reservation_state string
	// var roomID uint

	// movieID := c.Param("movieID")

	// initializers.DB.Raw("SELECT room_id_fk FROM movies WHERE movie_id = ?", movieID).Scan(&roomID)
	// initializers.DB.Raw("SELECT id, seat_name, room_id_fk  FROM seats WHERE room_id_fk = ?", roomID).Scan(&Seats)
	// initializers.DB.Raw("SELECT row_count, row_seat_quantity FROM rooms WHERE room_id = ?", roomID).Scan(&rowsCollumnsTemp)

	// for i := 0; i < len(Seats); i++ {

	// 	seatID := Seats[i].Id
	// 	initializers.DB.Raw("SELECT reservation_state FROM tickets WHERE seat_id_fk = ? ", seatID).Scan(&reservation_state)

	// 	Seats[i].Reservation_state = reservation_state
	// }

	// c.JSON(200, gin.H{
	// 	"Seats":    Seats,
	// 	"Quantity": rowsCollumnsTemp,
	// })
	type rowsCollumns struct {
		Row_count         uint
		Row_seat_quantity uint
	}
	type SeatResStruct struct {
		Seat_id_fk        uint
		Seat_name         string
		Room_id_fk        uint
		Reservation_state string
	}

	var Seats []SeatResStruct
	var rowsCollumnsTemp rowsCollumns
	// var seatName string
	var roomID uint

	movieID := c.Param("movieID")
	// initializers.DB.Raw("SELECT * FROM tickets WHERE movie_id_fk = ?", movieID).Scan(&Seats)
	initializers.DB.Raw(
		"SELECT tickets.seat_id_fk, seats.seat_name, tickets.room_id_fk, tickets.reservation_state FROM tickets INNER JOIN seats ON tickets.seat_id_fk = seats.id WHERE tickets.movie_id_fk = ?",
		movieID).Scan(&Seats)

	initializers.DB.Raw("SELECT room_id_fk FROM movies WHERE movie_id = ?", movieID).Scan(&roomID)
	initializers.DB.Raw("SELECT row_count, row_seat_quantity FROM rooms WHERE room_id = ?", roomID).Scan(&rowsCollumnsTemp)

	// for i := 0; i < len(Seats); i++ {

	// 	seatID := Seats[i].Seat_id_fk
	// 	initializers.DB.Raw("SELECT seat_name FROM seats WHERE room_id_fk = ?", seatID).Scan(&seatName)

	// 	Seats[i].Seat_name = seatName
	// }

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
