import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { getEvents, deleteEvent } from "../service/api";
import "../styling/EventOrganizerPage.css";

const EventOrganizerPage = ({ user }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents();
        const userEvents = allEvents.filter(event => event.organizerId === user.id);
        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user.id]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
    }
  };

  return (
    <div className="event-organizer-page">
      <h1>My Events</h1>
      <div className="create-event-link">
        <Link to="/create-event" className="create-event-button">+ Create New Event</Link>
      </div>
      {events.length === 0 ? (
        <p>No events found. Create your first event!</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.status}</td>
                <td>
                  <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventOrganizerPage;
