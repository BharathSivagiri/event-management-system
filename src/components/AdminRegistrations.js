import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  TablePagination
} from '@mui/material';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/apiLinks';

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const headers = {
    'Authorization': `${token}`,
    'userId': `${userId}`
  };

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const { data } = await axios.get(API_ENDPOINTS.VIEW_REGISTRATIONS, {
          headers
        });
        setRegistrations(data);
      } catch (err) {
        setError('Failed to fetch registrations');
      }
    };

    fetchAllRegistrations();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Flattening the data for table display
  const flattenedRegistrations = registrations.flatMap(event => 
    event.Participants.length > 0 
      ? event.Participants.map(participant => ({
          eventName: event.eventName,
          eventId: event.eventId,
          ...participant
        }))
      : []
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Event Registrations</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Participant ID</TableCell>
              <TableCell>Participant Name</TableCell>
              <TableCell>Registration ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flattenedRegistrations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((registration) => (
                <TableRow key={registration.registrationId}>
                  <TableCell>{registration.eventId}</TableCell>
                  <TableCell>{registration.eventName}</TableCell>
                  <TableCell>{registration.userId}</TableCell>
                  <TableCell>{registration.username}</TableCell>
                  <TableCell>{registration.registrationId}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={flattenedRegistrations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default AdminRegistrations;