import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Agent Waiting Room</h1>
      <p>Select a waiting room to join:</p>
      <div>
        <Link to="/waiting-room/open-house">
          <button>Open House Waiting Room</button>
        </Link>
        <Link to="/waiting-room/call-center">
          <button>Call Center Waiting Room</button>
        </Link>
        <Link to="/waiting-room/training">
          <button>Training Waiting Room</button>
        </Link>
      </div>
    </div>
  );
}
