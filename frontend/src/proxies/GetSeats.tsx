import axios from 'axios';


export const GetSeats = (movieRoomID) => {
    return axios
    .get(`http://localhost:9090/seat/${movieRoomID}`, { withCredentials: true })
    .then((response) => {
        console.log(response.data.Seats)
        console.log(response.data.Quantity)

        return response.data
    })
}