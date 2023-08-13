import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaUY8JkJeagdv4ygdndJ7A1s-6UALsYrU",
  authDomain: "chat-app-9a31e.firebaseapp.com",
  projectId: "chat-app-9a31e",
  storageBucket: "chat-app-9a31e.appspot.com",
  messagingSenderId: "950869562407",
  appId: "1:950869562407:web:bb72f5b6def32b0958ea02",
  measurementId: "G-6LSGX1KKWG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();