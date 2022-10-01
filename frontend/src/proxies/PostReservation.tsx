import React from 'react'
import axios from 'axios'


export const PostReservation = (userID, seatID, movieID ) =>{
    return axios
    .post(`http://localhost:9090/seat`,  
        {
            Seat_id : seatID,
            User_id: userID,
            Movie_id: movieID
        }, 
        { withCredentials: true })
    .then((response) => {
        console.log(response.data)
        return response.data
    })
}

export default PostReservation