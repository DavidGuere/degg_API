import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import Dropzone from "../Utils/DropzoneHook";

export default function UserLogged() {
  const history = useHistory();
  const { currentUser, LogOut } = useAuth();
  const [category, setCategory] = useState("");

  function updateInfo() {
    history.push("./updateinfo");
  }

  async function handleLogout() {
    try {
      await LogOut();
      history.push("/Login");
    } catch {}
  }
  return (
    <>
      <h4>Hi {currentUser && currentUser.email}</h4>
      <Button className="w-100 btn btn-primary my-2" onClick={updateInfo}>
        Update information
      </Button>
      <Button className="w-100 btn btn-primary my-2" onClick={handleLogout}>
        Log out
      </Button>
      <Dropzone server={category} />
      <Button
        className="w-25 btn btn-primary btn-sm m-1"
        style={{ maxWidth: "90px" }}
        onClick={() => setCategory("People")}
      >
        People
      </Button>
      <Button
        className="w-25 btn btn-primary btn-sm m-1"
        style={{ maxWidth: "90px" }}
        onClick={() => setCategory("Nature")}
      >
        Nature
      </Button>
      <Button
        className="w-25 btn btn-primary btn-sm m-1"
        style={{ maxWidth: "90px" }}
        onClick={() => setCategory("Events")}
      >
        Events
      </Button>
      <Button
        className="w-25 btn btn-primary btn-sm m-1"
        style={{ maxWidth: "90px" }}
        onClick={() => setCategory("World")}
      >
        World
      </Button>
      <div>Saving to: {category}</div>
    </>
  );
}
