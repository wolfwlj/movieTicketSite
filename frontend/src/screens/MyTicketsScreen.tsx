import React from 'react'
import MyTicketContainer from "../components/MyTicketScreen/MyTicketContainer"

interface Props {
    usernameEmit: string
    userID : Number
}
const MyTicketsScreen = ({usernameEmit, userID} : Props)  => {
  return (
    <>
            {/* <h1>username {usernameEmit} - ID : {userID}</h1> */}
          <div>
            <h1>{usernameEmit}'s Tickets</h1>
            <MyTicketContainer usernameEmit={usernameEmit} userID={userID}/>

          </div>


    </>
  )
}

export default MyTicketsScreen