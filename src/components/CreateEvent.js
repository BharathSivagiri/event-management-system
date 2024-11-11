import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventLocation: '',
    eventCapacity: '',
    eventFee: '',
    eventStatus: 'opened',
    recStatus: 'active'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/ems/events/add', eventData, {
        headers: {
          Authorization: token,
          userId: '1'
        }
      });
      alert('Event created successfully');
      setEventData({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventLocation: '',
        eventCapacity: '',
        eventFee: '',
        eventStatus: 'opened',
        recStatus: 'active'
      });
    } catch (error) {
      alert('Failed to create event');
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
            margin="normal"
            value={eventData.eventName}
            onChange={(e) => setEventData({...eventData, eventName: e.target.value})}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={4}
            value={eventData.eventDescription}
            onChange={(e) => setEventData({...eventData, eventDescription: e.target.value})}
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={eventData.eventDate}
            onChange={(e) => setEventData({...eventData, eventDate: e.target.value.replace(/-/g, '')})}
          />
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={eventData.eventLocation}
            onChange={(e) => setEventData({...eventData, eventLocation: e.target.value})}
          />
          <TextField
            fullWidth
            label="Capacity"
            type="number"
            margin="normal"
            value={eventData.eventCapacity}
            onChange={(e) => setEventData({...eventData, eventCapacity: e.target.value})}
          />
          <TextField
            fullWidth
            label="Fee"
            type="number"
            margin="normal"
            value={eventData.eventFee}
            onChange={(e) => setEventData({...eventData, eventFee: e.target.value})}
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
