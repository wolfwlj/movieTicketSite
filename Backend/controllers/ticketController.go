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
		Movie_name         string
		Room_name          string
		Seat_name          string
		Viewing_date       string
		Viewing_start_time string
		Viewing_end_time   string
	}
	var TicketResx = []TicketRes{}
	// initializers.DB.Where("user_id_fk = ?", user_id).Find(&TicketResx)
	initializers.DB.Raw("SELECT * FROM tickets WHERE user_id_fk = ? ", user_id).Scan(&TicketResx)

	for i := 0; i < len(TicketResx); i++ {
		var Movie_name string
		var Room_name string
		var Seat_name string
		var Viewing_date string
		var Viewing_start_time string
		var Viewing_end_time string

		initializers.DB.Raw("SELECT movie_name FROM movies WHERE movie_id = ? ", TicketResx[i].Movie_id_fk).Scan(&Movie_name)
		initializers.DB.Raw("SELECT viewing_date FROM movies WHERE movie_id = ? ", TicketResx[i].Movie_id_fk).Scan(&Viewing_date)
		initializers.DB.Raw("SELECT viewing_start_time FROM movies WHERE movie_id = ? ", TicketResx[i].Movie_id_fk).Scan(&Viewing_start_time)
		initializers.DB.Raw("SELECT viewing_end_time FROM movies WHERE movie_id = ? ", TicketResx[i].Movie_id_fk).Scan(&Viewing_end_time)

		initializers.DB.Raw("SELECT room_name FROM rooms WHERE room_id = ?", TicketResx[i].Room_id_fk).Scan(&Room_name)
		initializers.DB.Raw("SELECT seat_name FROM seats WHERE id = ?", TicketResx[i].Seat_id_fk).Scan(&Seat_name)

		TicketResx[i].Movie_name = Movie_name
		TicketResx[i].Room_name = Room_name
		TicketResx[i].Seat_name = Seat_name
		TicketResx[i].Viewing_date = Viewing_date
		TicketResx[i].Viewing_start_time = Viewing_start_time
		TicketResx[i].Viewing_end_time = Viewing_end_time

	}

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
