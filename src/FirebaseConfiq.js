import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB_Tx6YDEACXXum8gIm2sYlDehEfsd9WXg",
  authDomain: "e-commerce-dd7c8.firebaseapp.com",
  projectId: "e-commerce-dd7c8",
  storageBucket: "e-commerce-dd7c8.appspot.com",
  messagingSenderId: "726510999276",
  appId: "1:726510999276:web:0236215c27d11f4e03b7c9",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const authConfig = auth;
export { auth, app, db, getFirestore, createUserWithEmailAndPassword };
