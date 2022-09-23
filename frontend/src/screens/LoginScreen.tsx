import { SyntheticEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(email, password)
    }




  return (
    <FormContainer>
        <h1>Login</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                 value={password} onChange={(e) => setPassword(e.target.value)} 
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen