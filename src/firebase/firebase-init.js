// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  
  // apiKey: "AIzaSyD6X8gNHmrahnZ0gp0mb93E6GsbeitHjUQ",
  // authDomain: "active-club-cb1de.firebaseapp.com",
  // projectId: "active-club-cb1de",
  // storageBucket: "active-club-cb1de.firebasestorage.app",
  // messagingSenderId: "683221783232",
  // appId: "1:683221783232:web:5e655e7ae1f218770b9325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);