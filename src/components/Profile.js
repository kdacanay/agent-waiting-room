// src/components/Profile.js
import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import PageTransition from './PageTransition';


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

  if (loading)

    if (loading) {
      return (
        <PageTransition>
          <Container sx={{ textAlign: 'center', py: 5 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading profile...
            </Typography>
          </Container>
        </PageTransition>
      );
    }

  if (!user) {
    return (
      <PageTransition>
        <Container sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body1">
            You’re not signed in.
          </Typography>
        </Container>
      </PageTransition>
    );
  }


  return (
    <Grow in={true} timeout={700}>
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
        <Avatar
          alt="Profile"
          src={user.photoURL || 'https://via.placeholder.com/160'}
          sx={{
            width: 160,
            height: 160,
            margin: '0 auto',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
            border: '2px solid black',
            mb: 2
          }}
        />

        <Typography variant="h5" gutterBottom>
          {user.displayName || 'No Name'}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> {user.phoneNumber || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Office:</strong> {user.office || 'N/A'}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#f1e000' }
            }}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload New Photo'}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
          </Button>
        </Box>
      </Container>
    </Grow>
  );
}
