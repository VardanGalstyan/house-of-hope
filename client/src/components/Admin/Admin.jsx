import { useState } from 'react'
import { Container, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Admin() {

    const navigate = useNavigate()
    const initialState = {
        user_name: '',
        password: ''
    }

    const [admin, setAdmin] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const response = fetch('https://house-of-hope.herokuapp.com/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${admin.user_name}:${admin.password}`
            },
            body: JSON.stringify(admin)
        })
        if (response.ok) {
            const data = response.json()
            setAdmin(data)
            navigate('/')
            console.log(data);
        } else {
            console.log('error')
        };

    }

    return (
        <Container fluid className='admin'>
            <Col md={3}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={admin.user_name}
                            onChange={(e) => setAdmin({ ...admin, user_name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={admin.password}
                            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="light" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Container>
    )
}

export default Admin