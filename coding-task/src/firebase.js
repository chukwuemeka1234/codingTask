// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuOUTJUMYEqOJG_d4JsdBoaCvWlswsyj8",
  authDomain: "codingtask-520b7.firebaseapp.com",
  projectId: "codingtask-520b7",
  storageBucket: "codingtask-520b7.appspot.com",
  messagingSenderId: "463860930603",
  appId: "1:463860930603:web:0e1c045df1ae833709f26e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};