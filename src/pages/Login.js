import { Form, Row, Col, InputGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { asyncLogin } from '../state/auth/middleware'

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import ErrorMsg from '../components/ErrorMsg'

import logo from '../assets/logo.png'
import style from '../styles/pages/Login.module.css'

export default function Login() {
    const { error = { status: false } } = useSelector(states => states)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    const [showPass, setShowPass] = useState(false)

    // Handle Login and Call Action to Redux
    async function handleLogin(e) {
        e.preventDefault()

        // Middleware pass
        dispatch(asyncLogin(username, pass))
    }

    return (
        <main className={style.layout}>
            <section>
                <img src={logo} alt="brand logo" width="70%" />
                {/* Error Display */}
                {error.status && (
                    <div style={{ width: '70%' }}>
                        <ErrorMsg title={error.message} />
                    </div>
                )}

                <Form className={style.form_login} onSubmit={(e) => handleLogin(e)}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="centered my-4">
                        <Col>
                            <Form.Group>
                                <InputGroup>
                                    <Form.Control placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} type={showPass ? 'text' : 'password'} required />
                                    <button className={style.show_pass_btn} onClick={() => setShowPass(!showPass)} type="button" >
                                        {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </button>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="centered mt-4">
                            <button type="submit">Login</button>
                        </Col>
                    </Row>
                </Form>
            </section>
        </main>
    )
}