// Import necessary dependencies for the registrations management
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiLinks";

const MyRegistrations = () => {
  // State management for registrations and UI controls
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMode: "",
    accountNumber: "",
    transactionType: "credit",
    paymentStatus: "paid",
    createdBy: "",
    amountPaid: "",
  });

  // Get user authentication details
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Set up API headers
  const headers = {
    Authorization: `${token}`,
    userId: `${userId}`,
  };

  // Fetch user's registrations on component mount
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await axios.get(API_ENDPOINTS.VIEW_REGISTRATIONS, {
          headers,
          params: { userId },
        });
        setRegistrations(data);
      } catch (err) {
        setError("Failed to fetch registrations");
      }
    };

    fetchRegistrations();
  }, []);

  // Handle registration cancellation
  const handleCancelRegistration = (registration) => {
    setSelectedRegistration(registration);
    setOpenDialog(true);
  };

  // Submit cancellation request
  const handleSubmitCancellation = async () => {
    try {
      const payload = {
        eventId: selectedRegistration.eventId,
        registrationId: selectedRegistration.Participants[0].registrationId,
        amountPaid: paymentDetails.amountPaid,
        userId,
        paymentMode: paymentDetails.paymentMode,
        accountNumber: paymentDetails.accountNumber,
        transactionType: "credit",
        paymentStatus: "paid",
        createdBy: paymentDetails.createdBy,
      };

      await axios.post(API_ENDPOINTS.CANCEL_REG_EVENT, payload, { headers });
      setOpenDialog(false);
      window.location.reload();
    } catch (err) {
      setError("Failed to cancel registration");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Registrations
      </Typography>

      {/* Error message display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Registrations grid */}
      <Grid container spacing={3}>
        {registrations.map((registration) => (
          <Grid item xs={12} md={6} key={registration.eventId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{registration.eventName}</Typography>
                <Typography color="textSecondary">
                  Registration ID: {registration.Participants[0].registrationId}
                </Typography>
                <Typography color="textSecondary">
                  Event ID: {registration.eventId}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleCancelRegistration(registration)}
                >
                  Cancel Registration
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Empty state message */}
        {registrations.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1">No registered events found.</Typography>
          </Grid>
        )}
      </Grid>

      {/* Cancellation dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Cancel Registration</DialogTitle>
        <DialogContent>
          {/* Payment mode selection */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={paymentDetails.paymentMode}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  paymentMode: e.target.value,
                })
              }
            >
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="netbanking">Net Banking</MenuItem>
            </Select>
          </FormControl>

          {/* Payment details fields */}
          <TextField
            fullWidth
            margin="normal"
            label="Amount Paid"
            type="number"
            value={paymentDetails.amountPaid}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                amountPaid: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Account Number"
            value={paymentDetails.accountNumber}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                accountNumber: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Created By"
            value={paymentDetails.createdBy}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                createdBy: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitCancellation}
            variant="contained"
            color="error"
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyRegistrations;
