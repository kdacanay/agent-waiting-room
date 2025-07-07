// src/components/UpcomingTraining.js
import React from 'react';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UpcomingTraining() {
  const { user } = useUser();

  if (!user) return <Navigate to="/" />;

  const sampleTrainings = [
    { topic: 'Cole Realty CRM Training', date: '2025-07-14', time: '10 AM - 11:30 AM', location: 'Blue Bell' },
    { topic: 'Open House Best Practices', date: '2025-07-20', time: '2 PM - 3:30 PM', location: 'Chadds Ford' },
  ];

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Training Sessions
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#fff200' }}>
            <TableRow>
              <TableCell><strong>Training Topic</strong></TableCell>
              <TableCell><strong>Date Scheduled</strong></TableCell>
              <TableCell><strong>Time Scheduled</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleTrainings.map((training, idx) => (
              <TableRow key={idx}>
                <TableCell>{training.topic}</TableCell>
                <TableCell>{training.date}</TableCell>
                <TableCell>{training.time}</TableCell>
                <TableCell>{training.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
