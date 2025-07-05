// src/components/Profile.js
import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Profile() {
  const { user, loading } = useUser();
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e) => {
    if (!user) return;
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { photoURL: downloadURL });

      alert('✅ Profile photo updated! Refresh to see changes.');
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Error uploading photo.');
    }
    setUploading(false);
  };

  if (loading) return <p className="text-center my-4">Loading profile...</p>;
  if (!user) return <p className="text-center my-4">You’re not signed in.</p>;

  return (
    <div className="container py-5 text-center">
<img
  src={user.photoURL || 'https://via.placeholder.com/160'}
  alt="Profile"
  width="160"
  height="160"
  style={{
    objectFit: 'cover',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)'
  }}
  className="rounded-circle mb-3 border border-dark"
/>



      <h3>{user.displayName || 'No Name'}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>
      <p><strong>Office:</strong> {user.office || 'N/A'}</p>

      <label className="btn btn-dark mt-3">
        {uploading ? 'Uploading...' : 'Upload New Photo'}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          hidden
        />
      </label>
    </div>
  );
}

