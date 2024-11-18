import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline, ManageSearch, Event, ListAlt, ListAltOutlined } from '@mui/icons-material';
import { useAlert } from '../context/AlertContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userId') === '1';
  const { showAlert } = useAlert();
  
  const handleAction = () => {
    try {
      // Your action logic
      showAlert('Operation successful!', 'success');
    } catch (error) {
      showAlert('Something went wrong!', 'error');
    }
  };

  const cardStyle = {
    height: '100%', 
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    }
  };

  const contentStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    textAlign: 'center' 
  };

  const iconStyle = { fontSize: 40, mb: 2, color: 'primary.main' };

  const dashboardItems = isAdmin ? [
    { icon: AddCircleOutline, title: 'Create Event', desc: 'Add new events to the system', path: '/create-event' },
    { icon: ManageSearch, title: 'Manage Events', desc: 'View, edit and delete events', path: '/events' },
    { icon: ListAltOutlined, title: 'View Registrations', desc: 'View all the registrations', path: '/admin/registrations' }
  ] : [
    { icon: Event, title: 'Browse Events', desc: 'View and register for events', path: '/events' },
    { icon: ListAlt, title: 'Cancel Event Registration', desc: 'Cancel event registrations', path: '/my-registrations' }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map(({ icon: Icon, title, desc, path }) => (
          <Grid item xs={12} md={6} lg={3} key={title}>
            <Card sx={cardStyle} onClick={() => navigate(path)}>
              <CardContent sx={contentStyle}>
                <Icon sx={iconStyle} />
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;