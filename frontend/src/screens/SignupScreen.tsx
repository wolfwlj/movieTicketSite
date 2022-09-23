import React from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'

const SignupScreen = () => {
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form>
            <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" placeholder="Enter your Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="FirstName" placeholder="Enter your first name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="LastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="LastName" placeholder="Enter your last name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="RepeatPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </FormContainer>
    )
}

export default SignupScreen