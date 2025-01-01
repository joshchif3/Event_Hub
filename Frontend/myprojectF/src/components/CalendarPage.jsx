import React, { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import { getEvents } from "../service/api"; // Import the API to get events
import "../styling/CalendarPage.css"; // Add custom styling if needed

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
      highlightDatesWithEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  // Filter events by selected date
  const filterEventsByDate = (date, eventsList) => {
    const filtered = eventsList.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    setFilteredEvents(filtered);
  };

  // Highlight dates with events
  const highlightDatesWithEvents = (eventsList) => {
    const highlighted = eventsList.map((event) => event.date);
    setHighlightedDates(highlighted);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterEventsByDate(date, events);
  };

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>
      <div className="calendar">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            highlightedDates.includes(date.toISOString().split("T")[0])
              ? "highlighted"
              : ""
          }
        />
      </div>
      <div className="events-list">
        <h3>Events on {selectedDate.toDateString()}</h3>
        <ul>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li key={event.id}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <p>Location: {event.location}</p>
                <p>Category: {event.category}</p>
                <p>Status: {event.status}</p>
              </li>
            ))
          ) : (
            <p>No events for this date.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
