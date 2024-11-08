import React from 'react';
import './EventDetail.css';

function EventDetail({ event }) {
  if (!event) return <p className="no-event">Select an event to see details</p>;

  return (
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Fee:</strong> {event.fee}</p>
    </div>
  );
}

export default EventDetail;
