// src/components/UpcomingCallCenter.js
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

export default function UpcomingCallCenter() {
  const { user } = useUser();

  if (!user) return <Navigate to="/" />;

  const sampleTasks = [
    { task: 'Cold Calling - FSBO', date: '2025-07-12', time: '9 AM - 12 PM', location: 'Wayne' },
    { task: 'Expired Listings Outreach', date: '2025-07-15', time: '1 PM - 3 PM', location: 'Doylestown' },
  ];

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Call Center Tasks
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#fff200' }}>
            <TableRow>
              <TableCell><strong>Task</strong></TableCell>
              <TableCell><strong>Date Scheduled</strong></TableCell>
              <TableCell><strong>Time Scheduled</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleTasks.map((task, idx) => (
              <TableRow key={idx}>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.time}</TableCell>
                <TableCell>{task.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
