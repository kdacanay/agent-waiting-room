import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const { user, agentProfile } = useUser();
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!agentProfile) {
    return <p>Loading profile...</p>;
  }

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    if (!photoFile) {
      setUploadError('Please select a file.');
      return;
    }

    try {
      setUploading(true);
      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      await uploadBytes(storageRef, photoFile);
      const downloadURL = await getDownloadURL(storageRef);

      // ✅ Update Firestore user doc
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });

      setUploadError('');
      setUploading(false);
      setPhotoFile(null);
      alert('Profile photo updated!');
    } catch (err) {
      console.error(err);
      setUploadError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2>Your Profile</h2>

      {agentProfile.photoURL && (
        <img 
          src={agentProfile.photoURL}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '50%',
            marginBottom: '20px'
          }}
        />
      )}

      <p><strong>Name:</strong> {agentProfile.name}</p>
      <p><strong>Email:</strong> {agentProfile.email}</p>
      <p><strong>Phone:</strong> {agentProfile.phone}</p>
      <p><strong>Office:</strong> {agentProfile.office}</p>

      <hr />

      <h5>Update Profile Photo</h5>

      <form onSubmit={handlePhotoUpload} className="mb-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files[0])}
          className="form-control mb-2"
        />

        {uploadError && (
          <div className="alert alert-danger">{uploadError}</div>
        )}

        <button
          type="submit"
          className="btn btn-weichert"
          disabled={uploading}
          style={{ backgroundColor: '#FFCC00', color: '#000' }}
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  );
}
