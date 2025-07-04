import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, agentProfile } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container text-center py-5">
      <h2>Welcome, {agentProfile?.name || 'Agent'}!</h2>
      <p>Select which waiting room you’d like to join:</p>

      <div className="d-flex flex-column align-items-center">
        <Link to="/waiting-room/open-house" className="btn btn-weichert my-2 w-50">Open House</Link>
        <Link to="/waiting-room/call-center" className="btn btn-weichert my-2 w-50">Call Center</Link>
        <Link to="/waiting-room/training" className="btn btn-weichert my-2 w-50">Training</Link>
      </div>
    </div>
  );
}
