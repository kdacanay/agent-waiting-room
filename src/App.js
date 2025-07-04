import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { UserProvider } from './UserContext';

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import WaitingRoomForm from './components/WaitingRoomForm';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Header />   {/* ✅ Always visible when logged in */}
        <Routes>
         <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/dashboard" element={<Dashboard />} />   {/* ✅ New! */}
  <Route path="/waiting-room/:roomType" element={<WaitingRoomForm />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
