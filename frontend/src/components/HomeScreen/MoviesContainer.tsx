import React from 'react'
import axios from 'axios'
import { useEffect, useState} from 'react';
import MovieWidget from './MovieWidget';
import '../../styles/movie_container.css'
import Carousel from 'react-bootstrap/Carousel';


const MoviesContainer = () => {
    const [movies, setMovies] = useState([])
    // const [room, setRoom] = useState('')

    const fetchMovies = async () => {
        await axios.get('http://localhost:9090/movie', { withCredentials: true })
        .then((response) => {
            setMovies(response.data.Movies)

        })
        .catch((error) => {
            console.log(error.response.data.message)
        }
        )
    }
    
    useEffect(() => {
        fetchMovies()
    }, [])

  return (
    // <div className="MoviesContainer">
    <Carousel variant="dark" className='Movie-Carousel'>
        
                {movies.map((movie: any) => <Carousel.Item><MovieWidget movie={movie}  key={movie.Movie_id} />  </Carousel.Item>)} 
       
    {/* // </div> */}
    </Carousel>
  )
}

export default MoviesContainer