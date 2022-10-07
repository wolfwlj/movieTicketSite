import React from 'react'
import axios from 'axios'

const CancelTicket = (ticketID) => {
    return axios
    .delete(`http://localhost:9090/ticket/${ticketID}`,  
    // .post(`https://gin-production-6435.up.railway.app/ticket/${ticketID}`,  

        { withCredentials: true })
    .then((response) => {
        console.log(response.data)
        return response.data
    })
}

export default CancelTicket

