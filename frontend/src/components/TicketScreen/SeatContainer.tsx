import { useState, useEffect, CSSProperties } from 'react'
import '../../styles/seats.css'
import { GetSeats } from '../../proxies/GetSeats';
import Seat  from './Seat';
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
interface Props {  

  movieRoomID: Number;
  movieRoom: string;
  usernameEmit: string
  userID : Number
  movieID : Number
  movieViewingDate: string
  movieStartTime: string
  movieEndTime: string
  movieName : string
}

function SeatContainer({
    movieRoomID, 
    movieRoom, 
    usernameEmit, 
    userID, 
    movieID, 
    movieViewingDate, 
    movieStartTime, 
    movieEndTime, 
    movieName
  }: Props) {

  console.log(movieRoomID)
  const [seats, setSeats] = useState([])
  const [seatRows, setSeatsRows] = useState(0)
  const [seatCollumns, setSeatsCollumns] = useState(0)

  let [loading, setLoading] = useState(true);





  const fetchSeats = async (movieRoomID, movieID) => {
      console.log(movieRoomID, movieID)
      await GetSeats(movieRoomID, movieID)
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);

        
        setSeats(data.Seats)
        setSeatsRows(data.Quantity.Row_count)
        setSeatsCollumns(data.Quantity.Row_seat_quantity)
        setLoading(false)

      })
      .catch((err) => {
          console.log(err)
      })  
  
  }
  useEffect(() => {
    fetchSeats(movieRoomID, movieID)
  }, [movieRoomID, movieID]);



  return (
    <>

      <div className='SeatScreen'>
        <p className='screen-bold'>Movie Screen </p>
      </div>

      {!loading ? (
        <div className='InnerSeatContainer' style={ 
          { 
          display: 'grid',
          gridTemplateColumns: `repeat(${seatCollumns}, 1fr)`,
          gridTemplateRows: `repeat(${seatRows}, 1fr)`,
          gridGap: '10px'
          }

          }>
            {seats.map((seat: any) => 
            <Seat  
              userID={userID} 
              usernameEmit={usernameEmit} 
              movieID={movieID} 
              seatID={seat.Seat_id_fk} 
              seat={seat}  
              movieViewingDate={movieViewingDate}
              movieStartTime={movieStartTime}
              movieEndTime={movieEndTime}
              movieName={movieName}
              key={seat.Seat_id_fk} /> 
              )} 

        </div>
      ) : (
        <div className="sweet-loading">
          <h4>
            Loading seats... (this can take a long time, my hosting sucks)
            </h4>
          <ClipLoader loading={loading} cssOverride={override} size={150} aria-label="Loading Spinner" />
        </div>
        )}
    </>
  )
}

export default SeatContainer