import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Utils/firebase";

const AuthContext = React.createContext();

// Hook to call the context
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function SignUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function Login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function LogOut() {
    return auth.signOut();
  }

  function updateEmail(email) {
    currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    currentUser.updatePassword(password);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    // Setting the user to current user. onAuthStateChanged returns a function
    const unsubscribeMethod = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    // calling function to unsubscribe.
    return unsubscribeMethod;
  }, []);

  // Payload
  const functions = {
    currentUser,
    SignUp,
    Login,
    LogOut,
    updateEmail,
    updatePassword,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={functions}>{children}</AuthContext.Provider>
  );
}
