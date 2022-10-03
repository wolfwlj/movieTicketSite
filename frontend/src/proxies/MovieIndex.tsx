import axios from 'axios';


export const getMovieIndex = (id) => {
    return axios
    //http://localhost:9090/movie/${id}
    .get(`https://gin-production-6435.up.railway.app/movie/${id}`, { withCredentials: true })
    .then((response) => {
        console.log(response.data.Movie)
        return response.data.Movie
    })
}