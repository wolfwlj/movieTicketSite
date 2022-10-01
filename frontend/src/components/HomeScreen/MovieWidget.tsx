import React from 'react'
import '../../styles/movie_widget.css' 

interface Props {

    movie: any
  }
function MovieWidget({movie}: Props) {
  return (
        <div key={movie.Movie_id}>  

            <p key={movie.Movie_id} className="MovieName-widget">Movie name : {movie.Movie_name}</p> 
            <p className="MovieDate-widget">viewing date : {movie.Viewing_date}</p>
            <img className="MovieImg-widget" src={movie.Image_url} />

            <button> 
                <a href={`/movie/${movie.Movie_id}`}>View</a>
            </button>

        </div> 

    )
}

export default MovieWidget