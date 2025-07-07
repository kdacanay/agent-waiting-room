// src/components/Listings.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

export default function Listings() {
  const { user } = useUser();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(db, 'listings'));
      const listingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(listingsData);
    };
    fetchListings();
  }, []);

  if (!user) return <Navigate to="/" />;

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Our Listings & Open Houses
      </Typography>
      <Grid container spacing={3}>
        {listings.map((listing, idx) => {
          const hasOpenHouse = listing['Open House Upcoming'] && listing['Open House Upcoming'].trim() !== '';
          return (
            <Slide
              direction="up"
              in={true}
              timeout={400 + idx * 100} // 👈 stagger each card
              key={listing.id}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    border: hasOpenHouse ? '2px solid #fff200' : '1px solid #ddd',
                    boxShadow: 3
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {listing['Address']}, {listing['City']}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2"><strong>MLS #:</strong> {listing['MLS #']}</Typography>
                      <Typography variant="body2"><strong>Status:</strong> {listing['Status']}</Typography>
                      <Typography variant="body2"><strong>Price:</strong> {listing['Current Price']}</Typography>
                      <Typography variant="body2">
                        <strong>Beds:</strong> {listing['Beds']} | <strong>Baths:</strong> {listing['Baths']}
                      </Typography>
                      <Typography variant="body2"><strong>Office:</strong> {listing['List Office Name']}</Typography>
                      <Typography variant="body2">
                        <strong>Open House Upcoming:</strong> {listing['Open House Upcoming'] || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Open House Count:</strong> {listing['Open House Count'] || '0'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Slide>
          );
        })}
      </Grid>
    </Container>
  );
}
