import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function WaitingRoomForm() {
  const { roomType } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    office: '',
    availableDays: [],
    preferredTime: '',
    openHouseGoal: '',
    preferredTasks: [],
    trainingNeeded: []
  });

  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updated = [...formData[name]];
      if (checked) {
        updated.push(value);
      } else {
        const index = updated.indexOf(value);
        if (index > -1) updated.splice(index, 1);
      }
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Submitting...');

    const payload = {
      ...formData,
      waitingRoomType: roomType,
      submittedOn: new Date().toISOString()
    };

    try {
      const response = await fetch('https://default9467b82f9011484fa3be93bfc08381.8e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/991d8cf2fdc44cfbbe5dbd43828da76b/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-9467b82f-9011-484f-a3be-93bfc083818e&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p9LvS1TZUKvpuQYolMDcw2srB3OhLWFte7EBqQR59S8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatusMessage('✅ Submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          office: '',
          availableDays: [],
          preferredTime: '',
          openHouseGoal: '',
          preferredTasks: [],
          trainingNeeded: []
        });
      } else {
        setStatusMessage('❌ Submission failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('❌ Submission error. Please check your connection.');
    }
  };

  const officeOptions = [
    '', 'BlueBell', 'ChaddsFord', 'Collegeville',
    'Doylestown', 'Philadelphia', 'Wayne', 'WestChester', 'Wilmington'
  ];

  const availableDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const preferredTimes = ['Morning (9am-11am)','Afternoon (12pm-4pm)','Evening (5pm-9pm)','Anytime'];
  const callCenterTasks = ['Cold Calling','FSBO','Expired Listings','Farming','Old Contacts','Seasonal'];
  const trainingTopics = ['Cole Realty','Bold Trail','myWeichert','Broker Mint','Call Center','Open House','Listings'];

  return (
    <div className="container fade-in py-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center">
        Join the {roomType?.charAt(0).toUpperCase() + roomType?.slice(1).replace('-', ' ')} Waiting Room
      </h2>

      {roomType === 'open-house' && (
        <div className="text-center mb-3">
          <Link to="/listings" className="btn btn-outline-dark">
            🏡 View All Listings & Open Houses
          </Link>
        </div>
      )}

      {roomType === 'call-center' && (
        <div className="text-center mb-3">
          <Link to="/upcoming-call-center" className="btn btn-outline-dark">
            📅 View Upcoming Call Center Tasks
          </Link>
        </div>
      )}

      {roomType === 'training' && (
        <div className="text-center mb-3">
          <Link to="/upcoming-training" className="btn btn-outline-dark">
            📅 View Upcoming Training Sessions
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <select
          name="office"
          value={formData.office}
          onChange={handleChange}
          className="form-control mb-3"
          required
        >
          {officeOptions.map((office) => (
            <option key={office} value={office}>
              {office === '' ? 'Select Office' : office}
            </option>
          ))}
        </select>

        {roomType === 'open-house' && (
          <>
            <label className="form-label fw-bold">Available Days:</label>
            {availableDays.map(day => (
              <div key={day} className="form-check">
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day}
                  checked={formData.availableDays.includes(day)}
                  onChange={handleChange}
                  className="form-check-input"
                  id={day}
                />
                <label htmlFor={day} className="form-check-label">{day}</label>
              </div>
            ))}

            <label className="form-label fw-bold mt-3">Preferred Time:</label>
            {preferredTimes.map(time => (
              <div key={time} className="form-check">
                <input
                  type="radio"
                  name="preferredTime"
                  value={time}
                  checked={formData.preferredTime === time}
                  onChange={handleChange}
                  className="form-check-input"
                  id={time}
                />
                <label htmlFor={time} className="form-check-label">{time}</label>
              </div>
            ))}

            <input
              name="openHouseGoal"
              placeholder="What is your Open House Goal?"
              value={formData.openHouseGoal}
              onChange={handleChange}
              className="form-control mt-3"
            />
          </>
        )}

        {roomType === 'call-center' && (
          <>
            <label className="form-label fw-bold">Preferred Tasks:</label>
            {callCenterTasks.map(task => (
              <div key={task} className="form-check">
                <input
                  type="checkbox"
                  name="preferredTasks"
                  value={task}
                  checked={formData.preferredTasks.includes(task)}
                  onChange={handleChange}
                  className="form-check-input"
                  id={task}
                />
                <label htmlFor={task} className="form-check-label">{task}</label>
              </div>
            ))}
          </>
        )}

        {roomType === 'training' && (
          <>
            <label className="form-label fw-bold">Requested Training:</label>
            {trainingTopics.map(topic => (
              <div key={topic} className="form-check">
                <input
                  type="checkbox"
                  name="trainingNeeded"
                  value={topic}
                  checked={formData.trainingNeeded.includes(topic)}
                  onChange={handleChange}
                  className="form-check-input"
                  id={topic}
                />
                <label htmlFor={topic} className="form-check-label">{topic}</label>
              </div>
            ))}
          </>
        )}

        <button
          type="submit"
          className="btn btn-dark mt-4"
          style={{ backgroundColor: '#FFCC00', color: '#000' }}
        >
          ✅ Submit
        </button>

        <div className="mt-3 text-center">
          {statusMessage && <span>{statusMessage}</span>}
        </div>
      </form>
    </div>
  );
}
