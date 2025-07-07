// scripts/uploadListings.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';

// ✅ Load your JSON manually
const listings = JSON.parse(fs.readFileSync('./new_listings.json', 'utf-8'));

// ✅ Your Firebase config:
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
const db = getFirestore(app);

async function uploadListings() {
  for (const listing of listings) {
    await addDoc(collection(db, 'listings'), listing);
    console.log(`✅ Added: ${listing.Address}`);
  }
  console.log('✅ All new listings uploaded!');
}

uploadListings();
