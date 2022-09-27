import React, { SyntheticEvent } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'



interface Props {
  usernameEmit: string
  setUsernameEmit: (username: string) => void
}


const Header = ({usernameEmit, setUsernameEmit}: Props) => {

   const logoutHandler = async (e: SyntheticEvent) => {
      e.preventDefault()

      
      await fetch('http://localhost:9090/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      })

      setUsernameEmit('')
  }



  return (
    <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
    <Container>
      <Navbar.Brand href="/">Movie ticket site</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        {usernameEmit ? (
          <Nav className="ms-auto">
            <Nav.Link href="/profile">{usernameEmit}</Nav.Link>
            <Nav.Link onClick={logoutHandler} href="/logout">Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        )}

      </Navbar.Collapse>
    </Container>
  </Navbar>
    )
}

export default Header