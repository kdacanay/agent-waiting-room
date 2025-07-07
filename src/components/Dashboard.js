// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import PageTransition from './PageTransition';

export default function Dashboard() {
  const { user } = useUser();

  return (
    <PageTransition>
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.displayName || 'Agent'}!
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Select which waiting room you’d like to join:
        </Typography>

        <Stack spacing={2}>
          <Fade in={true} timeout={600}>
            <Button
              component={Link}
              to="/waiting-room/open-house"
              variant="contained"
              color="primary"
              sx={{
                color: '#000',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#f1e000' }
              }}
            >
              🏡 Join Open House Waiting Room
            </Button>
          </Fade>

          <Button
            component={Link}
            to="/waiting-room/call-center"
            variant="contained"
            color="primary"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#f1e000' }
            }}
          >
            📞 Join Call Center Waiting Room
          </Button>

          <Button
            component={Link}
            to="/waiting-room/training"
            variant="contained"
            color="primary"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#f1e000' }
            }}
          >
            📚 Join Training Waiting Room
          </Button>
        </Stack>
      </Container>
    </PageTransition>
  );
}
