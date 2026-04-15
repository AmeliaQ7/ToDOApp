// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANvaoX98YufdhpIj1xEe3gx1i8nwkGRrU",
  authDomain: "todo-app-d1af8.firebaseapp.com",
  projectId: "todo-app-d1af8",
  storageBucket: "todo-app-d1af8.firebasestorage.app",
  messagingSenderId: "777469632082",
  appId: "1:777469632082:web:9444318bd2204a7005098b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
