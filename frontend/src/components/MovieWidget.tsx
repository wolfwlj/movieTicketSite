import React from 'react'

interface Props {
    movie: any
    room: string
  }
function MovieWidget({movie, room}: Props) {
  return (
        <div key={movie.Movie_id}>  

            <h3 key={movie.Movie_id}>Movie name : {movie.Movie_name}</h3> 
            <p>Room : {room}</p> 
            <p>viewing date : {movie.Viewing_date}</p>
            <img src={movie.Image_url} />

            <button> 
                <a href='#'>Buy a ticket</a>
            </button>

        </div> 

    )
}

export default MovieWidget