import CancelTicket from "../../proxies/CancelTicket"
import {  useEffect } from 'react'
import { useNavigate  } from 'react-router'

interface Props {
    usernameEmit: string
    userID : Number
    ticket : any
    ticketID : Number
}

const MyTicket = ({usernameEmit, userID, ticket, ticketID} :Props) => {
    let navigate = useNavigate()


    let id =  ticketID.toString()


    var splitViewDate = ticket.Viewing_date.split(/[T +]/);
    var splitStartTime = ticket.Viewing_start_time.split(/[T +]/);
    var splitEndTime = ticket.Viewing_end_time.split(/[T +]/);

    let tempViewDate = splitViewDate[0]
    let tempStartTime = splitStartTime[1]
    let tempEndTime = splitEndTime[1]




    const CancelTicketx = async (ticketID) => {
      console.log(ticketID)

      await CancelTicket(ticketID)
      .then((data) => {
          console.log(data)

          navigate(0);
      })
      .catch((err) => {
          console.log(err)
      }) 
    }








  return (
    <>

        <tbody>
            <tr>
            <td>{id}</td>
            <td>{ticket.Movie_name}</td>
            <td>{ticket.Room_name}</td>
            <td>{ticket.Seat_name}</td>
            <td>{tempViewDate}</td>
            <td>{tempStartTime}</td>
            <td>{tempEndTime}</td>
            <td>
              <button onClick={() =>CancelTicketx(ticketID)}>
                  Cancel
              </button>
            </td>


            </tr>

        </tbody>
    </>
  )
}

export default MyTicket