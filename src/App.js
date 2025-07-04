import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WaitingRoomForm from './components/WaitingRoomForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waiting-room/:roomType" element={<WaitingRoomForm />} />
      </Routes>
    </Router>
  );
}

export default App;

