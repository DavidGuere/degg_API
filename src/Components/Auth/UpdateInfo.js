import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { updateEmail, updatePassword } = useAuth();
  const history = useHistory();

  async function handleUpdate(e) {
    e.preventDefault();

    if (passRef.current.value.length !== 0) {
      if (passRef.current.value.length < 6) {
        return setError(
          "The password is too short. It must be at least 6 characters."
        );
      } else if (passRef.current.value !== passConfirmRef.current.value) {
        return setError(
          "The password and password confirmation does not match."
        );
      }
      try {
        setError("");
        setSuccessMessage("");

        await updatePassword(passRef.current.value);
        setSuccessMessage("Successfully update");

        window.setTimeout(() => history.push("/userhome"), 2000);
      } catch {
        setError("Something went wrong with the password update :( try again");
      }
    }

    if (emailRef.current.value.length !== 0) {
      console.log();
      try {
        setError("");
        setSuccessMessage("");

        await updateEmail(emailRef.current.value);
        setSuccessMessage("Successful update");

        window.setTimeout(() => history.push("/userhome"), 2000);
      } catch {
        setError("Something went wrong with the email update :( try again");
      }
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Change information</h2>
          <Form onSubmit={handleUpdate}>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            <Form.Group id="email">
              <Form.Label>Change email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="leave empty if you do not wish to change"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="pass">
              <Form.Label>Change password</Form.Label>
              <Form.Control
                type="password"
                ref={passRef}
                placeholder="leave empty if you do not wish to change"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="passConfirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control type="password" ref={passConfirmRef}></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit">
              Update information
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/userhome">Cancel</Link>
      </div>
    </>
  );
}
