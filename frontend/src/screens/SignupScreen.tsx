import { SyntheticEvent, useState} from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useNavigate  } from 'react-router'


const SignupScreen = () => {
    
    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(username, firstName, lastName, birthday, email, password,  confirmPassword)

        await fetch('http://localhost:9090/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'Username' : username,
                'First_name' : firstName,
                'Last_name' : lastName,
                'Birthdate' : birthday,
                'Email' : email,
                'Password' : password,
            })
        })
        navigate('/login')
        
        

    }



  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" placeholder="Enter your Username" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="FirstName" placeholder="Enter your first name" 
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="LastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="LastName" placeholder="Enter your last name"
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                 />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Birthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" placeholder="Birthday"
                    value={birthday} onChange={(e) => setBirthday(e.target.value)}
                 />
            </Form.Group>




            <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="RepeatPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" 
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </FormContainer>
    )
}

export default SignupScreen