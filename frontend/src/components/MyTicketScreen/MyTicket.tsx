import React from 'react'
import Table from 'react-bootstrap/Table';

interface Props {
    usernameEmit: string
    userID : Number
    ticket : any
    ticketID : Number
}

const MyTicket = ({usernameEmit, userID, ticket, ticketID} :Props) => {


    let id =  ticketID.toString()
  return (
    <>

        <tbody>
            <tr>
            <td>{id}</td>
            <td>{ticket.Movie_name}</td>
            <td>{ticket.Room_name}</td>
            <td>{ticket.Seat_name}</td>
            <td>{ticket.Viewing_date}</td>
            <td>{ticket.Viewing_start_time}</td>
            <td>{ticket.Viewing_end_time}</td>


            </tr>

        </tbody>
    </>
  )
}

export default MyTicket