import React, { useState } from 'react';
import './EventList.css';

function EventList({ events, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredEvents = events.filter(event => {
    return (
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDate === '' || event.date === filterDate)
    );
  });

  return (
    <div className="event-list">
      <div className="event-filters">
        <div className="search-inputs">
          <label htmlFor="search-events">Search events:</label>
          <input
            type="text"
            id="search-events"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-inputs">
          <label htmlFor="search-date">Filter by date:</label>
          <input
            type="date"
            id="search-date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id} className="event-item" onClick={() => onSelect(event)}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;

