import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function WaitingRoomForm() {
  const { roomType } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    office: '',
    availableDays: [],
    preferredTime: '',
    preferredTasks: [],
    requestedTraining: []
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formData[field], value]
      : formData[field].filter(item => item !== value);
    setFormData({ ...formData, [field]: updated });
  };

  const handleAvailableDaysChange = (e) => {
    handleCheckboxChange(e, 'availableDays');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      office: formData.office,
      availableDays: formData.availableDays.join(', '),
      preferredTime: formData.preferredTime,
      waitingRoomType: roomType,
      preferredTasks: formData.preferredTasks.join(', '),
      requestedTraining: formData.requestedTraining.join(', ')
    };

    try {
      const response = await fetch(
        'https://default9467b82f9011484fa3be93bfc08381.8e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/991d8cf2fdc44cfbbe5dbd43828da76b/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-9467b82f-9011-484f-a3be-93bfc083818e&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p9LvS1TZUKvpuQYolMDcw2srB3OhLWFte7EBqQR59S8',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission)
        }
      );

      if (response.ok) {
        setSuccessMessage('✅ Submitted successfully! We\'ll be in touch.');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          office: '',
          availableDays: [],
          preferredTime: '',
          preferredTasks: [],
          requestedTraining: []
        });
      } else {
        setErrorMessage('❌ Submission failed. Please try again.');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMessage('❌ Network error. Please check your connection.');
      setSuccessMessage('');
    }
  };
  function toTitleCase(str) {
    return str
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }


  return (
    <div className="container py-5">
      {/* ✅ Only the Home button at the top */}
      <div className="text-center mb-4">
        <Link to="/" className="btn btn-home mt-3">🏠 Home</Link>
      </div>

      <div
        className="mx-auto"
        style={{
          maxWidth: '600px',
          backgroundColor: '#F5F5F5',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 className="text-center mb-4">
          Join the {toTitleCase(roomType)} Waiting Room
        </h2>


        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Office</label>
            <select
              name="office"
              value={formData.office}
              onChange={handleChange}
              className="form-select"
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
          </div>

          {roomType !== 'Training' && (
            <div className="mb-3">
              <label className="form-label">Available Days</label>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={day}
                    checked={formData.availableDays.includes(day)}
                    onChange={handleAvailableDaysChange}
                    id={`day-${day}`}
                  />
                  <label className="form-check-label" htmlFor={`day-${day}`}>
                    {day}
                  </label>
                </div>
              ))}
            </div>
          )}

          {roomType !== 'Training' && (
            <div className="mb-4">
              <label className="form-label">Preferred Time</label>
              {[
                'Morning (9am - 11am)',
                'Afternoon (12pm - 4pm)',
                'Evening (5pm - 9pm)',
                'Anytime'
              ].map(time => (
                <div key={time} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="preferredTime"
                    value={time}
                    checked={formData.preferredTime === time}
                    onChange={handleChange}
                    id={`time-${time}`}
                  />
                  <label className="form-check-label" htmlFor={`time-${time}`}>
                    {time}
                  </label>
                </div>
              ))}
            </div>
          )}

          {roomType === 'Call Center' && (
            <div className="mb-3">
              <label className="form-label">Preferred Tasks</label>
              {['Cold Calling', 'FSBO', 'Expired Listings', 'Farming', 'Old Contacts', 'Seasonal'].map(task => (
                <div key={task} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={task}
                    checked={formData.preferredTasks.includes(task)}
                    onChange={(e) => handleCheckboxChange(e, 'preferredTasks')}
                    id={`task-${task}`}
                  />
                  <label className="form-check-label" htmlFor={`task-${task}`}>
                    {task}
                  </label>
                </div>
              ))}
            </div>
          )}

          {roomType === 'Training' && (
            <div className="mb-3">
              <label className="form-label">Requested Training</label>
              {['Cole Realty', 'Bold Trail', 'myWeichert', 'Broker Mint', 'Call Center', 'Open House', 'Listings'].map(training => (
                <div key={training} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={training}
                    checked={formData.requestedTraining.includes(training)}
                    onChange={(e) => handleCheckboxChange(e, 'requestedTraining')}
                    id={`training-${training}`}
                  />
                  <label className="form-check-label" htmlFor={`training-${training}`}>
                    {training}
                  </label>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="btn btn-weichert w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
