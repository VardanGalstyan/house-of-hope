import { useState, useContext } from 'react'
import { Container, Col, Form, Button } from 'react-bootstrap'
import ls from 'localstorage-slim'
import { useNavigate } from 'react-router-dom'
import { adminContext } from '../../App'
import { FiRefreshCw } from 'react-icons/fi'
import base64 from 'base-64'
import './style.css'

ls.config.encrypt = true

function Admin() {

    const navigate = useNavigate()
    const initialState = { user_name: '', password: '' }
    const { isAdmin, setIsAdmin } = useContext(adminContext)
    const [admin, setAdmin] = useState(initialState)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${base64.encode(`${admin.user_name}:${admin.password}`)}`
                },
                body: JSON.stringify(admin)
            })
            if (response.ok) {
                setIsLoading(false)
                setIsAdmin(true)
                navigate('/')
                ls.set('house_admin', true)
            } else {
                setIsLoading(false)
                setError(true)
            };
        } catch (error) {
            console.log(error)
        }
    }

    const handleRefresh = () => {
        setAdmin(initialState)
        setError(null)
    }

    const handleLogout = () => {
        setIsAdmin(false)
        ls.remove('house_admin')
    }

    return (
        <Container fluid className='admin'>
            <Col xs={10} md={3}>
                {
                    isAdmin
                        ? <Button className='admin-logout' onClick={handleLogout}>Log Out</Button>
                        : <Form onSubmit={handleSubmit}>
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
                            <div className="form-buttons d-flex justify-content-between">
                                <Button variant={!error ? "light" : "danger"} type="submit">
                                    {
                                        error ? "Wrong Credentials" :
                                            isLoading ? 'Loading...' : 'Login'
                                    }
                                </Button>
                                {
                                    error &&
                                    <Button variant='light' onClick={handleRefresh}>
                                        <FiRefreshCw />
                                    </Button>
                                }
                            </div>
                        </Form>
                }
            </Col>
        </Container>
    )
}

export default Admin