import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { user, agentProfile } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) return null; // Hide header if not logged in

  return (
    <div className="bg-dark text-white py-2 px-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {/* ✅ Show profile photo if available */}
        {agentProfile?.photoURL ? (
          <img
            src={agentProfile.photoURL}
            alt="Profile"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '10px'
            }}
          />
        ) : (
          <div 
            className="bg-secondary text-white d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginRight: '10px'
            }}
          >
            {agentProfile?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        )}
        Welcome, {agentProfile?.name || 'Agent'}!
      </div>

      <div>
        <Link to="/dashboard" className="btn btn-light btn-sm me-2">Dashboard</Link>
        <Link to="/profile" className="btn btn-light btn-sm me-2">Profile</Link>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
      </div>
    </div>
  );
}
