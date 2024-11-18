import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, IconButton, Button } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import EditEventForm from './EditEventForm';

export const EventDialog = ({ event, isAdmin, onClose, onDelete, setShowRegistration, setSelectedEventForRegistration, onEventUpdate }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  if (!event) return null;

  const handleRegisterClick = () => {
    onClose();
    setShowRegistration(true);
    setSelectedEventForRegistration(event);
  };

  if (showEditForm) {
    return (
      <EditEventForm 
        event={event}
        onClose={() => setShowEditForm(false)}
        onSuccess={() => {
          setShowEditForm(false);
          onClose();
          onEventUpdate();
        }}
      />
    );
  }

  return (
    <Dialog 
      open={!!event} 
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
          <Typography variant="h6">{event.eventName}</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography color="text.secondary">{event.eventDescription}</Typography>
        <Typography>Event ID: {event.eventId}</Typography>
        <Typography>Location: {event.eventLocation}</Typography>
        <Typography>Date: {event.eventDate}</Typography>
        <Typography>Capacity: {event.eventCapacity}</Typography>
        <Typography>Fee: Rs.{event.eventFee}</Typography>
      </DialogContent>
      <DialogActions>
        {isAdmin ? (
          <>
            <IconButton onClick={() => onDelete(event.eventId)}><Delete /></IconButton>
            <IconButton onClick={() => setShowEditForm(true)}><Edit /></IconButton>
          </>
        ) : (
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};