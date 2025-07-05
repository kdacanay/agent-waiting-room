import React from 'react';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function UpcomingTraining() {
  const { user } = useUser();

  if (!user) return <Navigate to="/" />;

  const sampleTrainings = [
    { topic: 'Cole Realty CRM Training', date: '2025-07-14', time: '10 AM - 11:30 AM', location: 'Blue Bell' },
    { topic: 'Open House Best Practices', date: '2025-07-20', time: '2 PM - 3:30 PM', location: 'Chadds Ford' },
  ];

  return (
    <div className="container fade-in py-5">
      <h2 className="mb-4">Upcoming Training Sessions</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Training Topic</th>
            <th>Date Scheduled</th>
            <th>Time Scheduled</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {sampleTrainings.map((training, idx) => (
            <tr key={idx}>
              <td>{training.topic}</td>
              <td>{training.date}</td>
              <td>{training.time}</td>
              <td>{training.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
