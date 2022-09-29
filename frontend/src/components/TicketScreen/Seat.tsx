import React from 'react'
interface Props {  
    seat : any
  }



function Seat({seat}: Props) {
    let color = ''

    if(seat.Reservation_state === 'available'){
        color = 'green'
    }

    switch (seat.Reservation_state ) {
        case 'available':
            color = 'green'

            break;
        case 'reserved':
            color = 'red'

            break;

        default:
            color = 'black'

            break;
    }





    return (
        <div className='seatDiv'>
            <p style={
                {
                    color: color
                }
            }>{seat.Seat_name}</p>
        </div>
    )
}

export default Seat