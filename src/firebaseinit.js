// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6jEJL4J5278q2VRwHXfj07CV9b50XEAw",
  authDomain: "photofolio-a956d.firebaseapp.com",
  projectId: "photofolio-a956d",
  storageBucket: "photofolio-a956d.appspot.com",
  messagingSenderId: "799290899008",
  appId: "1:799290899008:web:e2f302ee2d785d6cca3da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)