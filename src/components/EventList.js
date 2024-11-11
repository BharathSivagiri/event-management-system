import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Paper, Typography, TextField, Box, Card,
  CardContent, Button, IconButton, Stack
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dateRange, setDateRange] = useState({
    dateA: '',
    dateB: ''
  });

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (searchKeyword) params.append('keyword', searchKeyword);
      if (dateRange.dateA) params.append('dateA', dateRange.dateA.replace(/-/g, ''));
      if (dateRange.dateB) params.append('dateB', dateRange.dateB.replace(/-/g, ''));
  
      const response = await axios.get(`http://localhost:8080/ems/events/view?${params}`, {
        headers: {
          'Authorization': `${token}`,
          'userId': '1'
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [searchKeyword, dateRange]);
  

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, searchKeyword, dateRange]);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/ems/events/delete/${eventId}`, {
        headers: {
          Authorization: token,
          userId: '1'
        }
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Events</Typography>
        
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
            <Card key={event.eventId}>
              <CardContent>
                <Typography variant="h6">{event.eventName}</Typography>
                <Typography color="text.secondary">
                  {event.eventDescription}
                </Typography>
                <Typography>
                  Location: {event.eventLocation}
                </Typography>
                <Typography>
                  Date: {event.eventDate}
                </Typography>
                <Typography>
                  Capacity: {event.eventCapacity}
                </Typography>
                <Typography>
                  Fee: Rs.{event.eventFee}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <IconButton onClick={() => handleDelete(event.eventId)}>
                    <Delete />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Register
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default EventList;