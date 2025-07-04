import React, { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [office, setOffice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Upload profile photo if provided
      let photoURL = '';
      if (photoFile) {
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
      }

      // 3️⃣ Save to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        office,
        email,
        photoURL
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
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
          <h2>Agent Signup</h2>
        </div>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control mb-3"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control mb-3"
            required
          />

          <select
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            className="form-select mb-3"
            required
          >
            <option value="">Select Office</option>
            <option value="BlueBell">Blue Bell</option>
            <option value="ChaddsFord">Chadds Ford</option>
            <option value="Collegeville">Collegeville</option>
            <option value="Doylestown">Doylestown</option>
            <option value="Philadelphia">Philadelphia</option>
            <option value="Wayne">Wayne</option>
            <option value="WestChester">West Chester</option>
            <option value="Wilmington">Wilmington</option>
          </select>

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

          {/* ✅ New: Profile photo file picker */}
          <label className="form-label">Upload Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="form-control mb-3"
          />

          <button
            type="submit"
            className="btn btn-weichert w-100 mb-2"
            style={{ backgroundColor: '#FFCC00', color: '#000' }}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}
