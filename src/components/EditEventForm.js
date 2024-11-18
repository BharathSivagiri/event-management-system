import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/apiLinks';

const EditEventForm = ({ event, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    eventName: event.eventName,
    eventDescription: event.eventDescription,
    eventDate: event.eventDate,
    eventLocation: event.eventLocation,
    eventCapacity: event.eventCapacity,
    eventFee: event.eventFee,
    eventStatus: event.eventStatus,
    recStatus: event.recStatus
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        API_ENDPOINTS.UPDATE_EVENT.replace(':eventId', event.eventId),
        {
          ...formData,
          eventDate: formData.eventDate.replace(/-/g, ''),
          eventCapacity: String(formData.eventCapacity),
          eventFee: Number(formData.eventFee)
        },
        {
          headers: {
            'Authorization': localStorage.getItem('token'),
            'userId': localStorage.getItem('userId')
          }
        }
      );
      onSuccess();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Dialog 
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionProps={{
        timeout: 300
      }}
      PaperProps={{
        sx: {
          transform: 'none',
          transition: 'all 0.3s ease-in-out !important',
          '&.MuiDialog-paper': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '&.MuiDialog-paperEntering': {
            opacity: 0,
            transform: 'scale(0.95)',
          },
          '&.MuiDialog-paperExiting': {
            opacity: 0,
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Event</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit} id="edit-event-form">
          <TextField
            fullWidth
            label="Event Name"
            value={formData.eventName}
            onChange={handleChange('eventName')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.eventDescription}
            onChange={handleChange('eventDescription')}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            type="date"
            label="Date"
            value={formData.eventDate}
            onChange={handleChange('eventDate')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            value={formData.eventLocation}
            onChange={handleChange('eventLocation')}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Capacity"
            value={formData.eventCapacity}
            onChange={handleChange('eventCapacity')}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Fee"
            value={formData.eventFee}
            onChange={handleChange('eventFee')}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Event Status</InputLabel>
            <Select
              value={formData.eventStatus}
              onChange={handleChange('eventStatus')}
              label="Event Status"
            >
              <MenuItem value="opened">OPENED</MenuItem>
              <MenuItem value="closed">CLOSED</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Record Status</InputLabel>
            <Select
              value={formData.recStatus}
              onChange={handleChange('recStatus')}
              label="Record Status"
            >
              <MenuItem value="active">ACTIVE</MenuItem>
              <MenuItem value="inactive">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" type="submit" form="edit-event-form">
          Update Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventForm;