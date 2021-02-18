import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*
Configuration file for Firebase. This is where this app is linked to the firebase project. Also exposes Firebase backend APIs
(auth, firestore, etc.) via the firebase object.
*/

var firebaseConfig = {
  apiKey: "AIzaSyAMbJ_l5K9aa7CnFyqbc2W4U2YZLL46W5o",
  authDomain: "ggserver-e6c58.firebaseapp.com",
  projectId: "ggserver-e6c58",
  storageBucket: "ggserver-e6c58.appspot.com",
  messagingSenderId: "830341747024",
  appId: "1:830341747024:web:4bf0954d53e428cc40dc55",
  measurementId: "G-JPBYY8W7HD",
};

const fb = firebase.initializeApp(firebaseConfig);
export const auth = fb.auth();
export default firebase;
