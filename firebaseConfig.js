// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-830tjH6i4Nr0E0f7ZUTkU2kQpukoyOs",
  authDomain: "practice-3e967.firebaseapp.com",
  databaseURL: "https://practice-3e967-default-rtdb.firebaseio.com",
  projectId: "practice-3e967",
  storageBucket: "practice-3e967.appspot.com",
  messagingSenderId: "1081936901247",
  appId: "1:1081936901247:web:cdee5838dce501d151fb4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;