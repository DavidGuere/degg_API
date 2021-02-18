import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function Signup() {
  // Catching values without triggering re-render
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const [error, setError] = useState("");
  // Calling context
  const { SignUp } = useAuth();
  const history = useHistory();

  async function handleSignUp(e) {
    // prevent form from refreshing
    e.preventDefault();

    // Validation of input
    if (passRef.current.value.length < 6) {
      return setError(
        "The password is too short. It must be at least 6 characters."
      );
    } else if (passRef.current.value !== passConfirmRef.current.value) {
      return setError("The password and password confirmation does not match.");
    }

    try {
      setError("");
      await SignUp(emailRef.current.value, passRef.current.value);
      history.push("/userhome");
    } catch {
      setError("Something went wrong :( try again");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSignUp}>
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
            <Form.Group id="passConfirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/Login">Log in</Link>
      </div>
    </>
  );
}
