import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="container fade-in py-5 text-center">
      <h1 className="mb-4">Welcome, {user?.displayName || 'Agent'}!</h1>
      <p className="mb-5">Select which waiting room you’d like to join:</p>

      <Link
        to="/waiting-room/open-house"
        className="btn btn-dark m-2 bounce-link bounce-delay-1"
        style={{ backgroundColor: '#FFCC00', color: '#000' }}
      >
        🏡 Join Open House Waiting Room
      </Link>

      <Link
        to="/waiting-room/call-center"
        className="btn btn-dark m-2 bounce-link bounce-delay-2"
        style={{ backgroundColor: '#FFCC00', color: '#000' }}
      >
        📞 Join Call Center Waiting Room
      </Link>

      <Link
        to="/waiting-room/training"
        className="btn btn-dark m-2 bounce-link bounce-delay-3"
        style={{ backgroundColor: '#FFCC00', color: '#000' }}
      >
        📚 Join Training Waiting Room
      </Link>
    </div>
  );
}
