import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/apiLinks';

const CreateEvent = () => {
  const initialState = {
    eventName: '',
    eventDescription: '',
    eventLocation: '',
    eventDate: '',
    eventCapacity: '',
    eventFee: '',
    eventStatus: 'opened',
    recStatus: 'active'
  };

  const [eventData, setEventData] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const formatDate = (date) => date.replace(/-/g, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: name === 'eventDate' ? formatDate(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_ENDPOINTS.ADD_EVENT, eventData, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'userId': localStorage.getItem('userId')
        }
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/events');
      }, 2000);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const renderTextField = (label, name, type = 'text', multiline = false, rows = 1) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      margin="normal"
      multiline={multiline}
      rows={rows}
      value={name === 'eventDate' && eventData[name] 
        ? `${eventData[name].substring(0,4)}-${eventData[name].substring(4,6)}-${eventData[name].substring(6,8)}`
        : eventData[name]}
      onChange={handleChange}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
    />
  );

  return (
    <Container maxWidth="sm">
      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ mt: 2 }}
        >
          Event created successfully!
        </Alert>
      )}
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Create Event</Typography>
        <form onSubmit={handleSubmit}>
          {renderTextField('Event Name', 'eventName')}
          {renderTextField('Description', 'eventDescription', 'text', true, 4)}
          {renderTextField('Event Date', 'eventDate', 'date')}
          {renderTextField('Location', 'eventLocation')}
          {renderTextField('Capacity', 'eventCapacity', 'number')}
          {renderTextField('Fee', 'eventFee', 'number')}
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