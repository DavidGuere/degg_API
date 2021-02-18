import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        );
      }}
    ></Route>
  );
}
