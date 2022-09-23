import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';



function App() {
  return (
    <Router>
      <Header />
      <main >
        <Container>
          <Routes>
            <Route path="/home" element={<HomeScreen/>} />
            <Route path="/signup" element={<SignupScreen/>} />
            <Route path="/login" element={<LoginScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
