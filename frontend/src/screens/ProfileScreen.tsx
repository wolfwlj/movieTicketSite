import React from 'react'
interface Props {
    usernameEmit: string
    userID : Number
    userEmail : string
    userFirstName : string
    userLastName : string
    userBirthdate : string
}
const ProfileScreen = ({usernameEmit, userID, userEmail, userFirstName, userLastName, userBirthdate} : Props) => {
  return (
    <div>
        <h2>Username : {usernameEmit}</h2>
        <h2>Email : {userEmail}</h2>
        <h2>First Name : {userFirstName}</h2>
        <h2>Last Name : {userLastName}</h2>
        <h2>BirthDate : {userBirthdate}</h2>


    </div>
  )
}

export default ProfileScreen