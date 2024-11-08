import React, { useState } from 'react';
import './EventForm.css';

function EventForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, date, location, description, fee });
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
    setFee('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>Location:</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

      <label>Fee:</label>
      <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} /> 

      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
