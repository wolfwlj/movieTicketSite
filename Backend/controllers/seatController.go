package controllers

import (
	"fmt"
	"movieBackend/initializers"
	"movieBackend/models"
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
