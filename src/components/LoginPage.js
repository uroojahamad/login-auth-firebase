import React, { useState } from 'react'
import { Form, Button, Card, Image, Alert, Spinner } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const LoginPage = () => {
  const [inputText, setInputText] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInputText(prevInput =>{
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(inputText.email, inputText.password);
      navigate("/dashboard");

    } catch (error) {
      setError("Failed to login!")
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          {loading && <Spinner animation="border" variant="primary" />}
          <div className='d-flex-col text-center'>
            <Image src={require("../images/anonymous-avatar-icon-25.jpg")} style={{width:"4rem", height:"4rem"}}roundedCircle />
            <h1 className="mb-3">Log In</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="Enter Email"
                size="lg"
                name='email'
                value={inputText.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
                size="lg"
                name='password'
                value={inputText.password}
                onChange={handleChange}
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Forgot Password?
          </div>
          <div className="w-100 text-center mt-3">
            Create a new account ? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default LoginPage