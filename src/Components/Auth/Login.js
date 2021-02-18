import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState("");
  const history = useHistory();
  const { Login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await Login(emailRef.current.value, passRef.current.value);
      history.push("/userhome");
    } catch {
      setError("Could not log in");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>
          <Form onSubmit={handleLogin}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="pass">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit">
              Log in
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/password-reset">Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need and account? <Link to="/Signup">Sign up</Link>
      </div>
    </>
  );
}
