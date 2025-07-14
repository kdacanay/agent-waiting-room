// src/components/WaitingRoomForm.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';

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
    if (!user) {
      navigate('/');
    } else {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        office: user.office || ''
      }));
    }
  }, [user, roomType, navigate]);

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

    let payload = {
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      office: formData.office || '',
      waitingRoomType: roomType || '',
      openHouseGoal: '',
      availableDays: '',
      preferredTime: '',
      preferredTasks: '',
      requestedTraining: ''
    };

    if (roomType === 'open-house') {
      payload.availableDays = formData.availableDays.join(', ');
      payload.preferredTime = formData.preferredTime || '';
      payload.openHouseGoal = formData.openHouseGoal || '';
    }

    if (roomType === 'call-center') {
      payload.preferredTasks = formData.preferredTasks.join(', ');
    }

    if (roomType === 'training') {
      payload.requestedTraining = formData.trainingNeeded.join(', ');
    }

    try {
      const response = await fetch(
        'https://default9467b82f9011484fa3be93bfc08381.8e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/991d8cf2fdc44cfbbe5dbd43828da76b/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-9467b82f-9011-484f-a3be-93bfc083818e&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p9LvS1TZUKvpuQYolMDcw2srB3OhLWFte7EBqQR59S8',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        // ✅ Log to Firestore once
        await addDoc(collection(db, 'waitingRoomLogs'), {
          userId: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          roomType,
          payload,
          submittedAt: serverTimestamp(),
        });

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

  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const preferredTimes = ['Morning (9am-11am)', 'Afternoon (12pm-4pm)', 'Evening (5pm-9pm)', 'Anytime'];
  const callCenterTasks = ['Cold Calling', 'FSBO', 'Expired Listings', 'Farming', 'Old Contacts', 'Seasonal'];
  const trainingTopics = ['Cole Realty', 'Bold Trail', 'myWeichert', 'Broker Mint', 'Call Center', 'Open House', 'Listings'];

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Join the {roomType?.charAt(0).toUpperCase() + roomType?.slice(1).replace('-', ' ')} Waiting Room
      </Typography>

      {roomType === 'open-house' && (
        <Box textAlign="center" mb={2}>
          <Button component={Link} to="/listings" variant="outlined" color="secondary">
            🏡 View All Listings & Open Houses
          </Button>
        </Box>
      )}
      {roomType === 'call-center' && (
        <Box textAlign="center" mb={2}>
          <Button component={Link} to="/upcoming-call-center" variant="outlined" color="secondary">
            📅 View Upcoming Call Center Tasks
          </Button>
        </Box>
      )}
      {roomType === 'training' && (
        <Box textAlign="center" mb={2}>
          <Button component={Link} to="/upcoming-training" variant="outlined" color="secondary">
            📅 View Upcoming Training Sessions
          </Button>
        </Box>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="office-label">Office</InputLabel>
          <Select
            labelId="office-label"
            name="office"
            value={formData.office}
            label="Office"
            onChange={handleChange}
          >
            {officeOptions.map((office) => (
              <MenuItem key={office} value={office}>
                {office === '' ? 'Select Office' : office}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {roomType === 'open-house' && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Available Days:</Typography>
            <FormGroup>
              {availableDays.map(day => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Preferred Time:</Typography>
            <RadioGroup name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
              {preferredTimes.map(time => (
                <FormControlLabel
                  key={time}
                  value={time}
                  control={<Radio />}
                  label={time}
                />
              ))}
            </RadioGroup>

            <TextField
              label="What is your Open House Goal?"
              name="openHouseGoal"
              fullWidth
              margin="normal"
              value={formData.openHouseGoal}
              onChange={handleChange}
            />
          </>
        )}

        {roomType === 'call-center' && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Preferred Tasks:</Typography>
            <FormGroup>
              {callCenterTasks.map(task => (
                <FormControlLabel
                  key={task}
                  control={
                    <Checkbox
                      name="preferredTasks"
                      value={task}
                      checked={formData.preferredTasks.includes(task)}
                      onChange={handleChange}
                    />
                  }
                  label={task}
                />
              ))}
            </FormGroup>
          </>
        )}

        {roomType === 'training' && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Requested Training:</Typography>
            <FormGroup>
              {trainingTopics.map(topic => (
                <FormControlLabel
                  key={topic}
                  control={
                    <Checkbox
                      name="trainingNeeded"
                      value={topic}
                      checked={formData.trainingNeeded.includes(topic)}
                      onChange={handleChange}
                    />
                  }
                  label={topic}
                />
              ))}
            </FormGroup>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#f1e000' } }}
        >
          ✅ Submit
        </Button>

        {statusMessage && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {statusMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
