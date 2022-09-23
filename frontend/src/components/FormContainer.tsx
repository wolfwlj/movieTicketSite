import React from 'react'
import { Row, Container, Col } from 'react-bootstrap'

interface Props {
    children: React.ReactNode
}
const FormContainer = ({ children }: Props) => {
  return (
    <Container>
        <Row className='justify-content-md-center' >
            <Col cs={12} md={6}>
                {children}
            </Col>
        </Row>

    </Container>

    )
}

export default FormContainer