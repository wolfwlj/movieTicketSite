import React from 'react'
import '../../styles/movie_widget.css' 
import Carousel from 'react-bootstrap/Carousel';
interface Props {

    movie: any
  }
function MovieWidget({movie}: Props) {
  return (
        <>
            <div className='alignCenter'>
                <img className="MovieImg-widget" src={movie.Image_url} />

            </div>

 
            <Carousel.Caption className="MovieName-Caption">

                <h4 className="MovieName-widget white">{movie.Movie_name}</h4>

            </Carousel.Caption>
            <Carousel.Caption className="MovieButton-Caption">
                <button className='Ticket-Button'> 
                    <a className='white' href={`/movie/${movie.Movie_id}`}>Buy a ticket</a>
                </button>            
            </Carousel.Caption>

</>
    )
}

export default MovieWidget