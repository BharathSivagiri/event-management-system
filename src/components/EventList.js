import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Paper, Typography, TextField, Box, Card,
  CardContent, Button, IconButton, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import { Delete, Edit, Close } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/apiLinks';
import { MESSAGES } from '../constants/messages';
import { buildUrlWithParams } from '../utils/queryUtils';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dateRange, setDateRange] = useState({
    dateA: '',
    dateB: ''
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchCurrentUser = useCallback(async () => {

    const userId = localStorage.getItem('userId');
    setCurrentUser({ userId });
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (searchKeyword) params.append('keyword', searchKeyword);
      if (dateRange.dateA) params.append('dateA', dateRange.dateA.replace(/-/g, ''));
      if (dateRange.dateB) params.append('dateB', dateRange.dateB.replace(/-/g, ''));

      const viewUrl = buildUrlWithParams(API_ENDPOINTS.VIEW_EVENTS, params);
  
      const response = await axios.get(viewUrl, {
        headers: {
          'Authorization': `${token}`,
          'userId': localStorage.getItem('userId')
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error(MESSAGES.FETCH_ERROR, error);
    }
  }, [searchKeyword, dateRange]);

  useEffect(() => {
    fetchCurrentUser();
    fetchEvents();
  }, [fetchEvents, fetchCurrentUser]);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const id = eventId;
      const delUrl = (API_ENDPOINTS.DELETE_EVENT.replace(':eventId',id))

      await axios.delete(delUrl, {
        headers: {
          Authorization: token,
          userId: localStorage.getItem('userId')
        }
      });
      fetchEvents();
    } catch (error) {
      console.error(MESSAGES.DELETE_ERROR, error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const isAdmin = currentUser?.userId === '1';
  const navigate = useNavigate();

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Events</Typography>
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/create-event')}
            >
              Create Event
            </Button>
          )}
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Search Events"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <TextField
            fullWidth
            type="date"
            label="From Date"
            sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
            value={dateRange.dateA}
            onChange={(e) => setDateRange({...dateRange, dateA: e.target.value})}
          />
          <TextField
            fullWidth
            type="date"
            label="To Date"
            sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
            value={dateRange.dateB}
            onChange={(e) => setDateRange({...dateRange, dateB: e.target.value})}
          />
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {events.map((event) => (
            <Card 
              key={event.eventId} 
              onClick={() => handleEventClick(event)}
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
            >
              <CardContent>
                <Typography variant="h6">{event.eventName}</Typography>
                <Typography>Date: {event.eventDate}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{selectedEvent?.eventName}</Typography>
              <IconButton onClick={handleCloseDialog}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {selectedEvent && (
              <>
                <Typography color="text.secondary" paragraph>
                  {selectedEvent.eventDescription}
                </Typography>
                <Typography paragraph>
                  Location: {selectedEvent.eventLocation}
                </Typography>
                <Typography paragraph>
                  Date: {selectedEvent.eventDate}
                </Typography>
                <Typography paragraph>
                  Capacity: {selectedEvent.eventCapacity}
                </Typography>
                <Typography paragraph>
                  Fee: Rs.{selectedEvent.eventFee}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {isAdmin ? (
              <>
                <IconButton onClick={() => handleDelete(selectedEvent.eventId)}>
                  <Delete />
                </IconButton>
                <IconButton>
                  <Edit />
                </IconButton>
              </>
            ) : (
              <Button variant="contained" color="primary">
                Register
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default EventList;