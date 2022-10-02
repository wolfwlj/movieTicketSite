import { useEffect } from 'react'
import '../../styles/seats.css'
import { useParams } from "react-router-dom";

import { PostReservation } from '../../proxies/PostReservation'
import { useNavigate  } from 'react-router'

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    usernameEmit: string
    seat_name   : string
    userID : Number
    movieID : Number
    seatID : Number

  }


const MODAL_STYLES = {
    position: 'fixed' as 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    border: '1px solid #000'
}
const OVERLAY_STYLES = {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}


function TicketModal({isShown, hide, seat_name, userID, movieID, seatID}: ModalProps) {
    let navigate = useNavigate()
    const {id} = useParams<{id: string}>()

    const navParam = Number(id)

    const reserveSeat = async (userID, seatID, movieID) => {

        await PostReservation(userID, seatID, movieID)
            .then((data) => {
                console.log(data)
                navigate(0);
                // setSeatSeatID(data.Id)
            // setSeatName(data.Seat_name)
            // setSeatState(data.Reservation_state)
            // setRoomID(data.Room_id_fk)
    
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })  

    }
    // useEffect(() => {
    // //     fetchSeats(navParam)
    // // }, [movieID]);


    if( !isShown) return null

    return (
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES} >

            <h3>{seat_name}</h3>

            <button onClick={() => reserveSeat(userID, seatID, movieID)}>Reserve seat</button>

            <button onClick={hide}>Close</button>            
        </div>
        </>
    )
}

export default TicketModal