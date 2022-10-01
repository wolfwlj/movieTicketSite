
import TicketContainer from "../components/TicketScreen/TicketContainer" 
import '../styles/seats.css'

interface Props {
    usernameEmit: string
    userID : Number
    // setUsernameEmit: (username: string) => void
  
  }
  

function TicketScreen({usernameEmit, userID} : Props) {
    
    

  
return (
    <>  
        <div >
            <div className='TicketContainer'>
                <TicketContainer userID={userID} usernameEmit={usernameEmit}/>            
            </div>
        </div>


    </>
  )
}

export default TicketScreen