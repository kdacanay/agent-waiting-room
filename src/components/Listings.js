import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

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
    <div className="container fade-in py-5">
      <h2 className="mb-4">Our Listings & Open Houses</h2>
      <div className="row">
        {listings.map(listing => {
          const hasOpenHouse = listing['Open House Upcoming'] && listing['Open House Upcoming'].trim() !== '';
          return (
            <div className="col-md-4 mb-4" key={listing.id}>
              <div className={`card h-100 ${hasOpenHouse ? 'highlight-open-house' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">{listing['Address']}, {listing['City']}</h5>
                  <p><strong>MLS #:</strong> {listing['MLS #']}</p>
                  <p><strong>Status:</strong> {listing['Status']}</p>
                  <p><strong>Price:</strong> {listing['Current Price']}</p>
                  <p><strong>Beds:</strong> {listing['Beds']} | <strong>Baths:</strong> {listing['Baths']}</p>
                  <p><strong>Office:</strong> {listing['List Office Name']}</p>
                  <p><strong>Open House Upcoming:</strong> {listing['Open House Upcoming'] || 'N/A'}</p>
                  <p><strong>Open House Count:</strong> {listing['Open House Count'] || '0'}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
