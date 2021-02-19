import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*
Configuration file for Firebase. This is where this app is linked to the firebase project. Also exposes Firebase backend APIs
(auth, firestore, etc.) via the firebase object.
*/

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSSGSENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const fb = firebase.initializeApp(firebaseConfig);
export const auth = fb.auth();
export default firebase;
