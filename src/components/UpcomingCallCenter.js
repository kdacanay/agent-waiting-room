import React from 'react';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function UpcomingCallCenter() {
  const { user } = useUser();

  if (!user) return <Navigate to="/" />;

  const sampleTasks = [
    { task: 'Cold Calling - FSBO', date: '2025-07-12', time: '9 AM - 12 PM', location: 'Wayne' },
    { task: 'Expired Listings Outreach', date: '2025-07-15', time: '1 PM - 3 PM', location: 'Doylestown' },
  ];

  return (
    <div className="container fade-in py-5">
      <h2 className="mb-4">Upcoming Call Center Tasks</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date Scheduled</th>
            <th>Time Scheduled</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {sampleTasks.map((task, idx) => (
            <tr key={idx}>
              <td>{task.task}</td>
              <td>{task.date}</td>
              <td>{task.time}</td>
              <td>{task.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
