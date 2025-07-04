import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5 text-center">
      <img src="/WeichertLogoCoverImage.png" alt="Weichert Logo" style={{ width: '200px' }} />

      <h1 className="mb-4">Agent Waiting Rooms</h1>
      <p className="lead mb-5">Pick a room to join:</p>

      <div className="d-flex flex-column gap-3 mx-auto" style={{ maxWidth: '300px' }}>
        <Link to="/waiting-room/open-house" className="btn btn-weichert btn-lg">Open House Waiting Room</Link>
        <Link to="/waiting-room/call-center" className="btn btn-weichert btn-lg">Call Center Waiting Room</Link>
        <Link to="/waiting-room/training" className="btn btn-weichert btn-lg">Training Waiting Room</Link>
      </div>
    </div>
  );
}
