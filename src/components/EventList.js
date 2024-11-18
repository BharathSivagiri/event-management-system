import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Typography, TextField, Box, Card, CardContent, Button, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/apiLinks';
import { MESSAGES } from '../constants/messages';
import { buildUrlWithParams } from '../utils/queryUtils';
import { useDebounce } from '../hooks/useDebounce';
import { EventDialog } from './EventDialog';
import EventRegistration from './EventRegistration';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ searchKeyword: '', dateA: '', dateB: '', status: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState(null);
  const isAdmin = localStorage.getItem('userId') === '1';
  const navigate = useNavigate();
  const debouncedFilters = useDebounce(filters, 500);

  const fetchEvents = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        if (key === 'searchKeyword') params.append('keyword', value);
        else if (key.includes('date')) params.append(key, value.replace(/-/g, ''));
        else if (key === 'status' && isAdmin) params.append('status', value);
      });
      if (!isAdmin) params.append('status', 'active');

      const { data } = await axios.get(buildUrlWithParams(API_ENDPOINTS.VIEW_EVENTS, params), {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'userId': localStorage.getItem('userId')
        }
      });
      setEvents(data);
    } catch (error) {
      console.error(MESSAGES.FETCH_ERROR, error);
    }
  }, [filters, isAdmin]);

  useEffect(() => { fetchEvents(); }, [debouncedFilters, fetchEvents]);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(API_ENDPOINTS.DELETE_EVENT.replace(':eventId', eventId), {
        headers: {
          Authorization: localStorage.getItem('token'),
          userId: localStorage.getItem('userId')
        }
      });
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error(MESSAGES.DELETE_ERROR, error);
    }
  };

  const handleFilterChange = (field, value) => setFilters(prev => ({ ...prev, [field]: value }));

 const closeRegistration = () => {
    setShowRegistration(false);
    setSelectedEventForRegistration(null);
  };

  const handleCardClick = (event) => {
    setSelectedEvent(event);  // Show EventDialog for both admin and participants
    if (!isAdmin) {
      // For participants, EventDialog will have a Register button that triggers this
      setSelectedEventForRegistration(event);
    }
  };

  const getStatusStyles = (status) => ({
    color: status === 'active' ? 'success.main' : status === 'inactive' ? 'error.main' : 'text.secondary',
    backgroundColor: status === 'active' ? 'success.light' : status === 'inactive' ? 'error.light' : 'grey.100'
  });

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Events</Typography>
          {isAdmin && <Button variant="contained" onClick={() => navigate('/create-event')}>Create Event</Button>}
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField fullWidth label="Search Events" value={filters.searchKeyword} onChange={(e) => handleFilterChange('searchKeyword', e.target.value)} />
          {['dateA', 'dateB'].map((date) => (
            <TextField
              key={date}
              fullWidth
              type="date"
              label={date === 'dateA' ? 'From Date' : 'To Date'}
              value={filters[date]}
              onChange={(e) => handleFilterChange(date, e.target.value)}
              sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
            />
          ))}
          {isAdmin && (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={filters.status} label="Status" onChange={(e) => handleFilterChange('status', e.target.value)}>
                {['', 'active', 'inactive'].map((status) => (
                  <MenuItem key={status} value={status}>{status || 'All'}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {events.map((event) => (
            <Card key={event.eventId} onClick={() => handleCardClick(event)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">{event.eventName}</Typography>
                  {isAdmin && <Typography variant="caption" sx={{ ...getStatusStyles(filters.status), fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>{filters.status?.toUpperCase() || 'ALL'}</Typography>}
                </Box>
                <Typography>Date: {event.eventDate}</Typography>
                <Typography>Fee: ₹ {event.eventFee}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
                {showRegistration && selectedEventForRegistration && (
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      position: 'fixed', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      width: '90%', 
                      maxWidth: 600, 
                      maxHeight: '90vh', 
                      overflow: 'auto', 
                      zIndex: 1000, 
                      p: 3,
                      animation: 'fadeIn 0.3s ease-in-out',
                      '@keyframes fadeIn': {
                        '0%': {
                          opacity: 0,
                          transform: 'translate(-50%, -48%)'
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translate(-50%, -50%)'
                        }
                      }
                    }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={closeRegistration}>Close</Button>
            </Box>
            <EventRegistration eventId={selectedEventForRegistration.eventId} eventFee={selectedEventForRegistration.eventFee} />
          </Paper>
              )}
        
              <EventDialog 
                event={selectedEvent} 
                isAdmin={isAdmin} 
                onClose={() => setSelectedEvent(null)} 
                onDelete={handleDelete}
                onEventUpdate={fetchEvents}
                setShowRegistration={setShowRegistration}
                setSelectedEventForRegistration={setSelectedEventForRegistration}
              />
      </Paper>
    </Container>
  );
};

export default EventList;