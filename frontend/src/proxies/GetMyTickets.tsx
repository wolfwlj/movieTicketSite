import React from 'react'
import axios from 'axios'
export const GetMyTickets = (userID) => {

    return axios
    .get(`http://localhost:9090/ticket/${userID}`, { withCredentials: true })
    .then((response) => {
        console.log(response.data)

        return response.data
    })
}