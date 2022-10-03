import { useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import TicketScreen from './screens/TicketScreen';
import MyTicketsScreen from './screens/MyTicketsScreen';
import ProfileScreen from './screens/ProfileScreen';



function App() {
  const [userID, setUserID] = useState(0)
  const [usernameEmit, setUsernameEmit] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userFirstName, setFirstName] = useState('')
  const [userLastName, setLastName] = useState('')
  const [userBirthdate, setBirthdate] = useState('')


  useEffect(() => {
    (
    async () => {
    //'http://localhost:9090/validate'
      const res = await fetch('https://gin-production-6435.up.railway.app/validate', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',

      })

      const content = await res.json()
      console.log(content)
      let arr = []
      arr.push(content)
      setUsernameEmit(content.Username)
      setUserID(content.id)
      setUserEmail(content.Email)
      setFirstName(content.First_name)
      setLastName(content.Last_name)
      setBirthdate(content.Birthdate)
    }
    )()
  })





  return (
    <Router>
      <Header  usernameEmit={usernameEmit} setUsernameEmit={setUsernameEmit}/>
      <main >
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen usernameEmit={usernameEmit} />} />
            <Route path="/signup" element={<SignupScreen/>} />
            <Route path="/login" element={<LoginScreen usernameEmit={usernameEmit} setUsernameEmit={setUsernameEmit}/>} />
            <Route path="/movie/:id" element={<TicketScreen usernameEmit={usernameEmit} userID={userID}/>} />
            <Route path="/mytickets" element={<MyTicketsScreen usernameEmit={usernameEmit} userID={userID}/>} />
            <Route path="/profile" element={
            <ProfileScreen 
              userEmail={userEmail} 
              userFirstName={userFirstName} 
              userLastName={userLastName} 
              userBirthdate={userBirthdate}
              usernameEmit={usernameEmit} 
              userID={userID}/>
            } 
            />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
