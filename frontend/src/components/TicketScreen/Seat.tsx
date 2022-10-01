import '../../styles/seats.css'
import TicketModal from './TicketModal'
import { useEffect, useState } from 'react'
import { UseModal } from './UseModal'

interface Props {  
    seat : any
    usernameEmit: string
    userID : Number
    movieID : Number
    seatID : Number
  }


function Seat({seat, usernameEmit, userID, movieID, seatID}: Props) {


    const { isShown, toggle } = UseModal();

    let backgroundColor = ''

    if(seat.Reservation_state === 'available'){
        backgroundColor = 'green'
    }

    switch (seat.Reservation_state ) {
        case 'available':
            backgroundColor = '#34eb34'

            break;
        case 'reserved':
            backgroundColor = '#e83838'

            break;

        default:
            backgroundColor = 'black'

            break;
    }





    return (
        <div className='seatDiv' onClick={toggle }>
            <p style={
                {
                    backgroundColor: backgroundColor,
                    color: 'white',
                    margin: '0px 0px 0px 0px',
                    padding: '5px',
                    fontWeight: 'bold',

                }
            }>
                {seat.Seat_name}
            </p>
        
            <TicketModal movieID={movieID} seatID={seat.Id} userID={userID} usernameEmit={usernameEmit} isShown={isShown} hide={toggle} seat_name={seat.Seat_name}/>
        </div>

    )
}

export default Seat