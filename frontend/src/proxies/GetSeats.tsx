import axios from 'axios';


export const GetSeats = (movieRoomID, movieID) => {
    var params = new URLSearchParams();

    params.append('movieRoomID', movieRoomID);
    params.append('movieID', movieID);
    const request = {
        params: params
      }
    return axios
    .get(`http://localhost:9090/seat/${movieID}`, { withCredentials: true })
    .then((response) => {
        console.log(response.data.Seats)
        console.log(response.data.Quantity)
        console.log(response.data)

        return response.data
    })
}