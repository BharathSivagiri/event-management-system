import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/apiLinks';

const EventRegistration = ({ eventId }) => {
  const [registrationData, setRegistrationData] = useState({
    eventId: eventId,
    amountPaid: '',
    paymentMode: '',
    accountNumber: '',
    transactionType: '',
    paymentStatus: '',
    createdBy: '',
    userId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const submissionData = {
        ...registrationData,
        userId: userId 
      };

      await axios.post(API_ENDPOINTS.REG_FOR_EVENT, submissionData, {
        headers: {
          Authorization: token,
          userId: userId
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
            margin="normal"
            value={registrationData.amountPaid}
            onChange={(e) => setRegistrationData({...registrationData, amountPaid: e.target.value})}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={registrationData.paymentMode}
              label="Payment Mode"
              onChange={(e) => setRegistrationData({...registrationData, paymentMode: e.target.value})}
            >
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="creditcard">Credit Card</MenuItem>
              <MenuItem value="debitcard">Debit Card</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Transaction Type</InputLabel>
            <Select
              value={registrationData.transactionType}
              label="Transaction Type"
              onChange={(e) => setRegistrationData({...registrationData, transactionType: e.target.value})}
            >
              <MenuItem value="credit">Credit</MenuItem>
              <MenuItem value="debit">Debit</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Status</InputLabel>
            <Select
              value={registrationData.paymentStatus}
              label="Payment Status"
              onChange={(e) => setRegistrationData({...registrationData, paymentStatus: e.target.value})}
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="notpaid">Not Paid</MenuItem>
              <MenuItem value="paycancelled">Payment Cancelled</MenuItem>
            </Select>
          </FormControl>

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