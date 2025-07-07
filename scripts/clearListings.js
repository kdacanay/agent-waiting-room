// scripts/clearListings.js
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

// Replace with YOUR Firebase config:
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

async function clearListings() {
  const snapshot = await getDocs(collection(db, 'listings'));
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, 'listings', docSnap.id));
    console.log(`🗑️ Deleted: ${docSnap.id}`);
  }
  console.log('✅ All old listings deleted!');
}

clearListings();
