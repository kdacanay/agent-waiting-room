// src/components/Header.js
import React from 'react';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function Header() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFCC00' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {loading ? (
            <span>Loading profile...</span>
          ) : user ? (
            <>
<img
  src={user.photoURL || 'https://via.placeholder.com/60'}
  alt="Profile"
  width="60"
  height="60"
  style={{
    objectFit: 'cover',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)'
  }}
  className="rounded-circle me-2 border border-dark"
/>



              <h5 className="mb-0 fw-bold text-dark">
                Welcome, {user.displayName || 'Agent'}!
              </h5>
            </>
          ) : (
            <h5 className="mb-0 text-dark">Not signed in</h5>
          )}
        </div>
        {user && (
          <div>
            <Link to="/dashboard" className="btn btn-dark me-2">
              Dashboard
            </Link>
            <Link to="/profile" className="btn btn-outline-dark me-2">
              Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
