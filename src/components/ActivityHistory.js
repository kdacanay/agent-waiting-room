// src/components/ActivityHistory.js
import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from '../UserContext';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ActivityHistory() {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      const q = query(
        collection(db, 'waitingRoomLogs'),
        where('userId', '==', user.uid),
        orderBy('submittedAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
    };

    fetchLogs();
  }, [user]);

  if (!user) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="body1">You’re not signed in.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Activity History
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : logs.length === 0 ? (
        <Typography>No activity found yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Room</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map(log => (
                <TableRow key={log.id}>
                  <TableCell>{log.roomType}</TableCell>
                  <TableCell>
                    {log.submittedAt?.toDate().toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Box>
                      {Object.entries(log.payload).map(([key, value]) => (
                        <Typography
                          key={key}
                          variant="body2"
                          sx={{ lineHeight: 1.4 }}
                        >
                          <strong>{key}:</strong> {value}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
