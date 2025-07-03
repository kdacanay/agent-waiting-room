import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function WaitingRoomForm() {
  const { roomType } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    office: '',
    preferredTasks: '',
    trainingNeeded: '',
    preferredDays: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://default9467b82f9011484fa3be93bfc08381.8e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/991d8cf2fdc44cfbbe5dbd43828da76b/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-9467b82f-9011-484f-a3be-93bfc083818e&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p9LvS1TZUKvpuQYolMDcw2srB3OhLWFte7EBqQR59S8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        waitingRoomType: roomType
      })
    });

    if (response.ok) {
      alert('Submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        office: '',
        preferredTasks: '',
        trainingNeeded: '',
        preferredDays: ''
      });
    } else {
      alert('Submission failed.');
    }
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2>Join the {roomType.replace('-', ' ')} Waiting Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Agent Name"
          value={formData.name}
          onChange={handleChange}
        /><br />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        /><br />

        <input
          name="office"
          placeholder="Office"
          value={formData.office}
          onChange={handleChange}
        /><br />

        {roomType === 'call-center' && (
          <>
            <textarea
              name="preferredTasks"
              placeholder="Preferred Tasks"
              value={formData.preferredTasks}
              onChange={handleChange}
            />
            <br />
          </>
        )}

        {roomType === 'training' && (
          <>
            <input
              name="trainingNeeded"
              placeholder="Training Needed"
              value={formData.trainingNeeded}
              onChange={handleChange}
            />
            <br />
          </>
        )}

        <input
          name="preferredDays"
          placeholder="Preferred Days/Hours"
          value={formData.preferredDays}
          onChange={handleChange}
        /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

