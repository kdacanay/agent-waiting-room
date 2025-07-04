// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDOdJKrRfZDfT7wttUjDtN7eaPieTBN4zU",
  authDomain: "agent-waiting-room.firebaseapp.com",
  projectId: "agent-waiting-room",
  storageBucket: "agent-waiting-room.firebasestorage.app",
  messagingSenderId: "273912015639",
  appId: "1:273912015639:web:227d6d6faa0bae0c146552",
  measurementId: "G-7FXNXSGJWY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);