import React from 'react'

import { Nav } from 'react-bootstrap'

interface Props {
    usernameEmit: string
    userID : Number
    userEmail : string
    userFirstName : string
    userLastName : string
    userBirthdate : string
}
const ProfileScreen = ({usernameEmit, userID, userEmail, userFirstName, userLastName, userBirthdate} : Props) => {



  var splitViewDate = userBirthdate.split(/[T +]/);

  let birthday = splitViewDate[0]






  return (
    <div>
        <h3>Username : {usernameEmit}</h3>
        <h3>Email : {userEmail}</h3>
        <h3>First Name : {userFirstName}</h3>
        <h3>Last Name : {userLastName}</h3>
        <h3>BirthDate : {birthday}</h3>

        <br />
        <hr />
        <br />

        <Nav.Link href="/mytickets" > 
        <h4>
          See your Tickets &rarr;
          </h4>
        </Nav.Link>
    </div>
  )
}

export default ProfileScreen