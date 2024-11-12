import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/apiLinks';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventLocation: '',
    eventDate: '',
    eventCapacity: '',
    eventFee: '',
    eventStatus: 'opened',
    recStatus: 'active'
    
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventDate') {
      const formattedDate = value.replace(/-/g, '');
      setEventData(prev => ({
        ...prev,
        [name]: formattedDate
      }));
    } else {
      setEventData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      ...eventData,
      eventDate: eventData.eventDate.split('-').join('') 
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(API_ENDPOINTS.ADD_EVENT, formData, {
        headers: {
          'Authorization': token,
          'userId': localStorage.getItem('userId')
        }
      });
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Create Event</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Event Name"
            name="eventName"
            margin="normal"
            value={eventData.eventName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="eventDescription"
            margin="normal"
            multiline
            rows={4}
            value={eventData.eventDescription}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            type="date"
            name="eventDate"
            label="Event Date"
            value={eventData.eventDate ? `${eventData.eventDate.substring(0,4)}-${eventData.eventDate.substring(4,6)}-${eventData.eventDate.substring(6,8)}` : ''}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            fullWidth
            label="Location"
            name="eventLocation"
            margin="normal"
            value={eventData.eventLocation}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Capacity"
            name="eventCapacity"
            type="number"
            margin="normal"
            value={eventData.eventCapacity}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Fee"
            name="eventFee"
            type="number"
            margin="normal"
            value={eventData.eventFee}
            onChange={handleChange}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth 
            style={{ marginTop: '1rem' }}
          >
            Create Event
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEvent;
