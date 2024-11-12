import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Box, Card, CardContent, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/apiLinks';
import { MESSAGES } from '../constants/messages';
import { buildUrlWithParams } from '../utils/queryUtils';
import { useDebounce } from '../hooks/useDebounce';
import { EventDialog } from './EventDialog';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ searchKeyword: '', dateA: '', dateB: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isAdmin = localStorage.getItem('userId') === '1';
  const navigate = useNavigate();
  const debouncedFilters = useDebounce(filters, 500);

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key === 'searchKeyword' ? 'keyword' : key, 
          key.includes('date') ? value.replace(/-/g, '') : value);
      });

      const response = await axios.get(buildUrlWithParams(API_ENDPOINTS.VIEW_EVENTS, params), {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'userId': localStorage.getItem('userId')
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error(MESSAGES.FETCH_ERROR, error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedFilters]);

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

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Events</Typography>
          {isAdmin && (
            <Button variant="contained" onClick={() => navigate('/create-event')}>
              Create Event
            </Button>
          )}
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Search Events"
            value={filters.searchKeyword}
            onChange={(e) => handleFilterChange('searchKeyword', e.target.value)}
          />
          <TextField
            fullWidth
            type="date"
            label="From Date"
            value={filters.dateA}
            onChange={(e) => handleFilterChange('dateA', e.target.value)}
            sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
          />
          <TextField
            fullWidth
            type="date"
            label="To Date"
            value={filters.dateB}
            onChange={(e) => handleFilterChange('dateB', e.target.value)}
            sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
          />
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {events.map((event) => (
            <Card 
              key={event.eventId} 
              onClick={() => setSelectedEvent(event)}
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
            >
              <CardContent>
                <Typography variant="h6">{event.eventName}</Typography>
                <Typography>Date: {event.eventDate}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <EventDialog 
          event={selectedEvent}
          isAdmin={isAdmin}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default EventList;