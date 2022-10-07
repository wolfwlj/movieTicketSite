import React from 'react'
import  MyTicket  from './MyTicket'
import { useState, useEffect } from 'react'
import { GetMyTickets } from '../../proxies/GetMyTickets';
import Table from 'react-bootstrap/Table';




interface Props {
    usernameEmit: string
    userID : Number
}

const MyTicketContainer = ({usernameEmit, userID} :Props) => {

    const [tickets, setTickets] = useState([])

    const fetchTickets = async (userID) => {
        console.log(userID)
        await GetMyTickets(userID)
        .then((data) => {
            setTickets(data.tickets)
            
  

  
        })
        .catch((err) => {
            console.log(err)
        })  
    
    }
    useEffect(() => {
        fetchTickets(userID)
      }, [userID]);










  return (
    <div>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Ticket nr</th>
                <th>Movie name</th>
                <th>Cinema room</th>
                <th>Reserved Seat</th>
                <th>Viewing date</th>
                <th>Viewing start time</th>
                <th>Viewing end time</th>
                <th>Cancel ticket</th>

            </tr>
        </thead>
        {tickets.map((ticket: any) => 

                <MyTicket   
                    usernameEmit={usernameEmit} 
                    userID={userID} 
                    ticket={ticket} 
                    ticketID={ticket.Id} 
                    key={ticket.Id}/> 
                )} 

        </Table>

    </div>
  )
}

export default MyTicketContainer