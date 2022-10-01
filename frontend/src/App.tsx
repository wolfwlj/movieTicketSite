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



function App() {
  const [usernameEmit, setUsernameEmit] = useState('')
  const [userID, setUserID] = useState(0)


  useEffect(() => {
    (
    async () => {
      const res = await fetch('http://localhost:9090/validate', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',

      })

      const content = await res.json()
      let arr = []
      arr.push(content)
      setUsernameEmit(content.Username)
      setUserID(content.id)

      console.log(usernameEmit)
      console.log(userID)

    }
    )()
  })





  return (
    <Router>
      <Header  usernameEmit={usernameEmit} setUsernameEmit={setUsernameEmit}/>
      {/* <p>{content.Id}</p> */}
      <main >
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen usernameEmit={usernameEmit} />} />
            <Route path="/signup" element={<SignupScreen/>} />
            <Route path="/login" element={<LoginScreen usernameEmit={usernameEmit} setUsernameEmit={setUsernameEmit}/>} />
            <Route path="/movie/:id" element={<TicketScreen usernameEmit={usernameEmit} userID={userID}/>} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
