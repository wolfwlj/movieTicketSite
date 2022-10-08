import '../../styles/seats.css'

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
    movieViewingDate : string
    movieStartTime : string
    movieEndTime : string
    movieName   : string
    seatState : string
  }


const MODAL_STYLES = {
    position: 'fixed' as 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    border: '1px solid #000',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between'
    

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


function TicketModal({
    isShown, 
    hide, 
    seat_name, 
    userID, 
    movieID, 
    seatID, 
    movieViewingDate, 
    movieStartTime, 
    movieEndTime, 
    movieName, 
    seatState
}: ModalProps) {

    
    let navigate = useNavigate()
    // const {id} = useParams<{id: string}>()

    // const navParam = Number(id)

    const reserveSeat = async (userID, seatID, movieID) => {

        await PostReservation(userID, seatID, movieID)
            .then((data) => {
                console.log(data)
                navigate(0);

    
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })  

    }



    if( !isShown) return null

    if(!userID)return (
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES} >
            <p>You need to login to reserve a seat</p>

            <div className='buttons_div'>

                <button className='close_button' onClick={hide}>Close</button>    
            </div>
        </div>
        </>
    )


    if(seatState == 'reserved' )return (
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES} >
            <p>this seat is already reserved</p>
            <div className='buttons_div'>
                
                <button className='close_button' onClick={hide}>Close</button>    
            </div>
        </div>
        </>
    )
    if(seatState == 'available' )return (
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES} >
                <div>
                    <h2>Confirm Seat Reservation</h2>
                </div>

                <div>
                    <p>Seat name : {seat_name}</p>
                    <p>{movieName}</p>
                    <p>{movieViewingDate}</p>
                    <p>{movieStartTime} - {movieEndTime}</p>
            
                </div>
                
                <div className='buttons_div'>
                    
                    <button className='close_button' onClick={hide}>Close</button>    

                    <button className='reserve_button' onClick={() => reserveSeat(userID, seatID, movieID)}>Reserve seat</button>

                </div>
            
            </div>
        </>
    )
}

export default TicketModal