import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function Login() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();
  const { resetPassword } = useAuth();

  async function handlePassReset(e) {
    e.preventDefault();

    try {
      setSuccessMessage("");
      setError("");
      await resetPassword(emailRef.current.value);
      setSuccessMessage("Check your inbox for further instructions");

      window.setTimeout(() => history.push("/Login"), 2000);
    } catch {
      setError("Something went wrong :(");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset password</h2>
          <Form onSubmit={handlePassReset}>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit">
              Reset password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/Login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need and account? <Link to="/Signup">Sign up</Link>
      </div>
    </>
  );
}
