import React from 'react'
import axios from 'axios'


export const PostReservation = (userID, seatID, movieID ) =>{
    return axios
    //http://localhost:9090/ticket
    .post(`https://gin-production-6435.up.railway.app/ticket`,  
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