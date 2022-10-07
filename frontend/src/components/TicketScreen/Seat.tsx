import '../../styles/seats.css'
import TicketModal from './TicketModal'
import { UseModal } from './UseModal'

interface Props {  
    seat : any
    usernameEmit: string
    userID : Number
    movieID : Number
    seatID : Number
    movieViewingDate : string
    movieStartTime : string
    movieEndTime : string
    movieName   : string
    
  }


function Seat({seat, usernameEmit, userID, movieID, seatID, movieViewingDate, movieStartTime, movieEndTime, movieName}: Props) {


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
        
            <TicketModal  
                movieID={movieID} 
                seatID={seat.Id} 
                userID={userID} 
                usernameEmit={usernameEmit} 
                isShown={isShown} 
                hide={toggle} 
                seat_name={seat.Seat_name}
                movieViewingDate={movieViewingDate}
                movieStartTime={movieStartTime}
                movieEndTime={movieEndTime}
                movieName={movieName}
                seatState={seat.Reservation_state}

            />
        </div>

    )
}

export default Seat