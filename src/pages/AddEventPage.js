import React from 'react';
import EventForm from '../components/EventForm';

function AddEventPage({ onAddEvent }) {
  return (
    <div>
      <h2>Add New Event</h2>
      <EventForm onSubmit={onAddEvent} />
    </div>
  );
}

export default AddEventPage;
