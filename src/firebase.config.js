
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCdqthKJSBhyg_G-k5XqJdiV8-MLmYxFd0",
  authDomain: "jsi-firebase.firebaseapp.com",
  projectId: "jsi-firebase",
  storageBucket: "jsi-firebase.appspot.com",
  messagingSenderId: "395101700401",
  appId: "1:395101700401:web:93b0fac4f3bff1e83af010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// setting up firestore database 

export const db = getFirestore(app);