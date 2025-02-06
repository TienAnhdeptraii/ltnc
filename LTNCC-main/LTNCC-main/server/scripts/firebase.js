// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOxRYsnmBxXDwNOEvRbmbRKn4RUSoYImk",
  authDomain: "fir-9ad89.firebaseapp.com",
  projectId: "fir-9ad89",
  storageBucket: "fir-9ad89.appspot.com",
  messagingSenderId: "977836638973",
  appId: "1:977836638973:web:cd39162600066d985bb494",
  measurementId: "G-LM461C8VMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
export const authentification = getAuth(app);