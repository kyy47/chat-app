// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw7l_Lj7CxDNDk56IkMCvbVcxw1DvfvEc",
  authDomain: "chat-b013f.firebaseapp.com",
  projectId: "chat-b013f",
  storageBucket: "chat-b013f.appspot.com",
  messagingSenderId: "143153724484",
  appId: "1:143153724484:web:ccea06560746705290d011",
  measurementId: "G-1Z42B091V8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
