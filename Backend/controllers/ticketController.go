package controllers

import (
	"movieBackend/initializers"
	"movieBackend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateTickets(movieID uint, roomID uint, seats []models.Seat) bool {
	//for loop voor de rijen
	var i uint
	var length uint = uint(len(seats))
	for i = 0; i < length; i++ {
		//for loop voor de tickets

		ticket := models.Ticket{
			// Seat_name: seatName,
			Movie_id_fk: movieID,
			Room_id_fk:  roomID,
			Seat_id_fk:  seats[i].ID,
		}

		result := initializers.DB.Create(&ticket)

		if result.Error != nil {
			return false
		}
	}

	return true
	// Weet niet zeker of het de beste implementatie is, maar ben er wel tevreden mee
}

func ReserveTicket(c *gin.Context) {

	var body struct {
		Seat_id  uint
		User_id  uint
		Movie_id uint
	}

	c.Bind(&body)

	println(c.Request)

	var ticket models.Ticket
	// find ticker by seat id and movie id
	initializers.DB.Where("seat_id_fk = ? AND movie_id_fk = ?", body.Seat_id, body.Movie_id).First(&ticket)

	if ticket.Reservation_state == "available" {

		ticket.Reservation_state = "reserved"
		ticket.User_id_fk = &body.User_id

		initializers.DB.Save(&ticket)

	} else if ticket.Reservation_state == "reserved" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "seat has already been reserved",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "seat reserved",
		"ticket":  ticket,
		"user_id": body.User_id,
	})

}

func GetMyTickets(c *gin.Context) {

	user_id := c.Param("user_id")

	// var Ticket []models.Ticket
	// find ticker by seat id and movie id

	type TicketRes struct {
		Id                 uint
		User_id_fk         uint
		Seat_id_fk         uint
		Room_id_fk         uint
		Movie_id_fk        uint
		Movie_name         string //movie table
		Room_name          string //room table
		Seat_name          string //seat table
		Viewing_date       string //movie table
		Viewing_start_time string //movie table
		Viewing_end_time   string //movie table
	}
	var TicketResx = []TicketRes{}

	//SELECT tickets.id, tickets.user_id_fk, tickets.seat_id_fk, tickets.room_id_fk,
	//tickets.movie_id_fk, movies.movie_name, movies.viewing_date, movies.viewing_start_time,
	//movies.viewing_end_time, rooms.room_name, seats.seat_name
	//FROM tickets
	//INNER JOIN movies
	//ON tickets.movie_id_fk = movies.movie_id
	//INNER JOIN rooms
	//ON tickets.room_id_fk = rooms.room_id
	//INNER JOIN seats
	//ON tickets.seat_id_fk = seats.id
	//WHERE tickets.user_id_fk = 9

	// The comment above is the sql query that is executed below, Go doesn't support multiline strings so I put a formatted version above.

	initializers.DB.Raw("SELECT tickets.id, tickets.user_id_fk, tickets.seat_id_fk, tickets.room_id_fk, tickets.movie_id_fk, movies.movie_name, movies.viewing_date, movies.viewing_start_time, movies.viewing_end_time, rooms.room_name, seats.seat_name FROM tickets INNER JOIN movies ON tickets.movie_id_fk = movies.movie_id INNER JOIN rooms ON tickets.room_id_fk = rooms.room_id INNER JOIN seats ON tickets.seat_id_fk = seats.id WHERE tickets.user_id_fk = ?", user_id).Scan(&TicketResx)

	c.JSON(http.StatusOK, gin.H{
		"tickets": TicketResx,
	})

}

func DeleteTicket(c *gin.Context) {

	ticket_id := c.Param("ticket_id")

	//update ticket by ticket id
	initializers.DB.Exec("UPDATE tickets SET reservation_state = 'available', user_id_fk = NULL WHERE id = ?", ticket_id)

	c.JSON(http.StatusOK, gin.H{
		"ticket": "ticket " + ticket_id + " deleted",
	})

}
