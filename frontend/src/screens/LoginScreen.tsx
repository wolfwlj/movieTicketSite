import { SyntheticEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate  } from 'react-router'
interface Props {
    usernameEmit: string
    setUsernameEmit: (username: string) => void
}

const LoginScreen = ({usernameEmit, setUsernameEmit}: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        
        //http://localhost:9090/login
        const response = await fetch('https://gin-production-6435.up.railway.app/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                'Username' : username,
                'Password' : password,
            
            })
        })
        const data = await response.json()
        setUsernameEmit(data.Username)



        navigate('/')
    }




  return (
    <FormContainer>
        <h1>Login</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" placeholder="Enter your username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
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