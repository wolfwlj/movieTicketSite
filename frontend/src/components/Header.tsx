import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
    <Container>
      <Navbar.Brand href="/home">Movie ticket site</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/signup">Sign up</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )
}

export default Header