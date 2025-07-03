import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import WaitingRoomForm from './components/WaitingRoomForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waiting-room/:roomType" element={<WaitingRoomForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
