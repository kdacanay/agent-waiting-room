// src/components/Header.js
import React from 'react';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Header() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {loading ? (
            <Typography variant="body1">Loading profile...</Typography>
          ) : user ? (
            <>
              <Avatar
                alt="Profile"
                src={user.photoURL || 'https://via.placeholder.com/60'}
                sx={{
                  width: 60,
                  height: 60,
                  boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                  border: '2px solid black'
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ color: 'black', fontWeight: 'bold' }}
              >
                Welcome, {user.displayName || 'Agent'}!
              </Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ color: 'black' }}>
              Not signed in
            </Typography>
          )}
        </Box>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              color="secondary"
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              color="secondary"
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
