import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EventRegistration = ({ eventId }) => {
  const [registrationData, setRegistrationData] = useState({
    eventId: eventId,
    amountPaid: '',
    paymentMode: 'upi',
    accountNumber: '',
    transactionType: 'debit',
    paymentStatus: 'paid',
    createdBy: '',
    userId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/ems/events/registration', registrationData, {
        headers: {
          Authorization: token,
          userId: registrationData.userId
        }
      });
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Event Registration</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            margin="normal"
            value={registrationData.amountPaid}
            onChange={(e) => setRegistrationData({...registrationData, amountPaid: e.target.value})}
          />
          <TextField
            fullWidth
            label="Account Number"
            margin="normal"
            value={registrationData.accountNumber}
            onChange={(e) => setRegistrationData({...registrationData, accountNumber: e.target.value})}
          />
          <TextField
            fullWidth
            label="Created By"
            margin="normal"
            value={registrationData.createdBy}
            onChange={(e) => setRegistrationData({...registrationData, createdBy: e.target.value})}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth 
            style={{ marginTop: '1rem' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EventRegistration;
