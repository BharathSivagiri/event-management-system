import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userId') === '1';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
      {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
      </Typography>
      
      <Grid container spacing={3}>
        {isAdmin ? (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/create-event')}>
                <CardContent>
                  <Typography variant="h6">Create Event</Typography>
                  <Typography variant="body2">Add new events to the system</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/events')}>
                <CardContent>
                  <Typography variant="h6">Manage Events</Typography>
                  <Typography variant="body2">View, edit and delete events</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/events')}>
                <CardContent>
                  <Typography variant="h6">Browse Events</Typography>
                  <Typography variant="body2">View and register for events</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/my-registrations')}>
                <CardContent>
                  <Typography variant="h6">My Registrations</Typography>
                  <Typography variant="body2">View your event registrations</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
