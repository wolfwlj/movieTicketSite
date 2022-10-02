import { useState, useEffect } from 'react'
import '../../styles/seats.css'
import { GetSeats } from '../../proxies/GetSeats';
import Seat  from './Seat';

interface Props {  

  movieRoomID: Number;
  movieRoom: string;
  usernameEmit: string
  userID : Number
  movieID : Number
}

function SeatContainer({movieRoomID, movieRoom, usernameEmit, userID, movieID}: Props) {
  console.log(movieRoomID)
  const [seats, setSeats] = useState([])
  const [seatRows, setSeatsRows] = useState(0)
  const [seatCollumns, setSeatsCollumns] = useState(0)

  // const [SeatID, setSeatSeatID] = useState('')
  // const [SeatName, setSeatName] = useState('')
  // const [SeatState, setSeatState] = useState('')
  // const [RoomId, setRoomID] = useState('')




  const fetchSeats = async (movieRoomID, movieID) => {
      console.log(movieRoomID, movieID)
      await GetSeats(movieRoomID, movieID)
      .then((data) => {
        setSeats(data.Seats)
        setSeatsRows(data.Quantity.Row_count)
        setSeatsCollumns(data.Quantity.Row_seat_quantity)

        // setSeatSeatID(data.Id)
        // setSeatName(data.Seat_name)
        // setSeatState(data.Reservation_state)
        // setRoomID(data.Room_id_fk)

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
    <div className='InnerSeatContainer' style={ 
      { 
      display: 'grid',
      gridTemplateColumns: `repeat(${seatCollumns}, 1fr)`,
      gridTemplateRows: `repeat(${seatRows}, 1fr)`,
      gridGap: '10px'
      }

      }>
        {seats.map((seat: any) => <Seat  userID={userID} usernameEmit={usernameEmit} movieID={movieID} seatID={seat.Id} seat={seat}  key={seat.Id} /> )} 

    </div>
    </>
  )
}

export default SeatContainer