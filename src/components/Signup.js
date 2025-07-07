// src/components/Signup.js
import React, { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [office, setOffice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = '';
      if (photoFile) {
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        office,
        email,
        photoURL
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
          bgcolor: '#F5F5F5'
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src="/WeichertLogoCoverImage.png"
              alt="Weichert Logo"
              style={{ width: '180px', marginBottom: '10px' }}
            />
            <Typography variant="h5" gutterBottom>
              Agent Signup
            </Typography>
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSignup}>
            <TextField
              label="Name"
              fullWidth
              required
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Phone"
              fullWidth
              required
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="office-label">Office</InputLabel>
              <Select
                labelId="office-label"
                value={office}
                label="Office"
                onChange={(e) => setOffice(e.target.value)}
              >
                <MenuItem value="">Select Office</MenuItem>
                <MenuItem value="BlueBell">Blue Bell</MenuItem>
                <MenuItem value="ChaddsFord">Chadds Ford</MenuItem>
                <MenuItem value="Collegeville">Collegeville</MenuItem>
                <MenuItem value="Doylestown">Doylestown</MenuItem>
                <MenuItem value="Philadelphia">Philadelphia</MenuItem>
                <MenuItem value="Wayne">Wayne</MenuItem>
                <MenuItem value="WestChester">West Chester</MenuItem>
                <MenuItem value="Wilmington">Wilmington</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Upload Profile Photo
              </Typography>
              <Button
                variant="contained"
                component="label"
                color="secondary"
                sx={{ mr: 2 }}
              >
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhotoFile(e.target.files[0])}
                />
              </Button>
              {photoFile && (
                <Typography variant="body2">
                  Selected: {photoFile.name}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                color: '#000',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#f1e000' }
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link to="/" style={{ textDecoration: 'underline' }}>
              Login here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
