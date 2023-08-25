import React , {useState} from 'react'
import { Form, Button, Card, Image, Alert, Spinner} from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const SignUpPage = () => {
  const [inputText, setInputText] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInputText(prevInput => {
      return {
        ...prevInput,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(inputText.password !== inputText.confirmPassword){
      return setError("Password do no match!");
    }

    try{
      setError("");
      setLoading(true);
      await signup(inputText.email, inputText.password);
      navigate("/dashboard");

    }catch{
      setError("Failed to create an account")
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
                <h1 className="mb-3">Sign Up</h1>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="floatingInputCustom"
                    type="email"
                    placeholder="Enter Email"
                    size="lg"
                    name="email"
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
                    name="password"
                    value={inputText.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPasswordCustom">Password</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="floatingConfirmPasswordCustom"
                    type="password"
                    placeholder="Confirm Password"
                    size="lg"
                    name="confirmPassword"
                    value={inputText.confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingConfirmPasswordCustom">Confirm Password</label>
                </Form.Floating>
                <Button className="w-100" type="submit" disabled={loading}>
                  Sign Up
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                Already have an account ? <Link to="/">Log In</Link>
              </div>
            </Card.Body>
          </Card>
        </>
    )
}

export default SignUpPage