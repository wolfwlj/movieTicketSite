import { useEffect, useState } from 'react'
import { useParams} from "react-router-dom";
import { getMovieIndex } from '../proxies/MovieIndex';
import TicketContainer from "../components/TicketScreen/TicketContainer" 
import '../styles/seats.css'



function TicketScreen() {
    
    

  
return (
    <>  
        <div >
            <h1>ticket screen</h1>
            <div className='TicketContainer'>
                <TicketContainer />            
            </div>
        </div>


    </>
  )
}

export default TicketScreen