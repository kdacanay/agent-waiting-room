import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container fade-in py-5 text-center">
      <h1 className="mb-4">Welcome to the Agent Waiting Room</h1>
      <p className="mb-5">Choose which waiting room you’d like to join:</p>

      <Link to="/waiting-room/open-house" className="btn btn-dark m-2 bounce-link" style={{ backgroundColor: '#FFCC00', color: '#000' }}>
        🏡 Join Open House Waiting Room
      </Link>

      <Link to="/waiting-room/call-center" className="btn btn-dark m-2 bounce-link" style={{ backgroundColor: '#FFCC00', color: '#000' }}>
        📞 Join Call Center Waiting Room
      </Link>

      <Link to="/waiting-room/training" className="btn btn-dark m-2 bounce-link" style={{ backgroundColor: '#FFCC00', color: '#000' }}>
        📚 Join Training Waiting Room
      </Link>
    </div>
  );
}
