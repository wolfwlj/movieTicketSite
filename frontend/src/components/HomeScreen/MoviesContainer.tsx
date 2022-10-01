import React from 'react'
import axios from 'axios'
import { useEffect, useState} from 'react';
import MovieWidget from './MovieWidget';
import '../../styles/movie_container.css'


const MoviesContainer = () => {
    const [movies, setMovies] = useState([])
    // const [room, setRoom] = useState('')

    const fetchMovies = async () => {
        await axios.get('http://localhost:9090/movie', { withCredentials: true })
        .then((response) => {
            setMovies(response.data.Movies)

            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        }
        )
    }
    
    useEffect(() => {
        fetchMovies()
    }, [])

  return (
    <div className="MoviesContainer">
         <h2>movies contrainer</h2>

        <div className='movie-container'>

            {movies.map((movie: any) => <MovieWidget movie={movie}  key={movie.Movie_id} /> )} 

        </div>
    </div>
  )
}

export default MoviesContainer