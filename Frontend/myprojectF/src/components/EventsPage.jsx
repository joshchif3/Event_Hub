import React, { useState, useEffect } from 'react'; 
import { getEvents } from '../service/api';
import { useLocation, useNavigate } from 'react-router-dom';
import EventsList from './EventsList'; // Component to display the events
import "../styling/EventsPage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '', date: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch events when the component mounts or when filters change
  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Apply filters whenever filters or search term changes
  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, events]);

  // Update the filters and apply them
  const applyFilters = () => {
    let filtered = events;

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((event) =>
        event.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter((event) =>
        event.event_date && event.event_date.startsWith(filters.date)  // Filter by date in YYYY-MM-DD format
      );
    }

    // Filter by search term: title, description, organizer, and event_date
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by organizer
        (event.event_date && event.event_date.includes(searchTerm)) // Filter by event date
      );
    }

    setFilteredEvents(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      return newFilters;
    });
  };

  // Handle search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="events-page">
      <h2>Browse Events</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Filters */}
      <div className="filters">
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          {/* Add more categories as needed */}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Filter by location"
          value={filters.location}
          onChange={handleFilterChange}
        />

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>

      {/* Display filtered events */}
      <EventsList events={filteredEvents} />
    </div>
  );
};

export default EventsPage;
