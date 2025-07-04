import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div 
        className="p-4 rounded"
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#F5F5F5',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="text-center mb-4">
          <img 
            src="/WeichertLogoCoverImage.png" 
            alt="Weichert Logo"
            style={{ width: '180px', marginBottom: '10px' }}
          />
          <h2>Agent Login</h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            required
          />
          <button
            type="submit"
            className="btn btn-weichert w-100 mb-2"
            style={{ backgroundColor: '#FFCC00', color: '#000' }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
