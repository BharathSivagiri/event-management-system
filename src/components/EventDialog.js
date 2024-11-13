import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, IconButton, Button } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const EventDialog = ({ event, isAdmin, onClose, onDelete }) => {
  const navigate = useNavigate();
  
  if (!event) return null;

  const handleRegisterClick = () => {
    navigate(`/event-registration/${event.eventId}`);
    onClose();
  };

  return (
    <Dialog open={!!event} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{event.eventName}</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography color="text.secondary">{event.eventDescription}</Typography>
        <Typography >Location: {event.eventLocation}</Typography>
        <Typography >Date: {event.eventDate}</Typography>
        <Typography >Capacity: {event.eventCapacity}</Typography>
        <Typography >Fee: Rs.{event.eventFee}</Typography>
      </DialogContent>
      <DialogActions>
        {isAdmin ? (
          <>
            <IconButton onClick={() => onDelete(event.eventId)}><Delete /></IconButton>
            <IconButton><Edit /></IconButton>
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