// src/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ✅ Try to get Firestore user doc
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            // Merge Firestore fields with auth user
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: docSnap.data().name || firebaseUser.displayName || '',
              phoneNumber: docSnap.data().phone || firebaseUser.phoneNumber || '',
              office: docSnap.data().office || '',
              photoURL: docSnap.data().photoURL || firebaseUser.photoURL || '',
            });
          } else {
            // Fallback: no Firestore doc found, just use Firebase Auth user
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || '',
              phoneNumber: firebaseUser.phoneNumber || '',
              office: '',
              photoURL: firebaseUser.photoURL || '',
            });
          }
        } catch (error) {
          console.error('🔥 UserContext Firestore error:', error);
          // Still fallback to auth user
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || '',
            phoneNumber: firebaseUser.phoneNumber || '',
            office: '',
            photoURL: firebaseUser.photoURL || '',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
