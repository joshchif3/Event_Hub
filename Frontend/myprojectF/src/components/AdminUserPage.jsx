import React, { useState, useEffect } from "react";
import "../styling/AdminUserPage.css";
import { getEvents, updateEvent, deleteEvent } from "../service/api";

const AdminUserPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manage the expanded state for each event
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const event = events.find((e) => e.id === id);
      const updatedEvent = { ...event, status: "APPROVED" };
      await updateEvent(id, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === id ? updatedEvent : e))
      );
    } catch (error) {
      console.error(`Error approving event with ID ${id}:`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
    }
  };

  const handleMonitor = (id) => {
    console.log(`Monitoring event with ID: ${id}`);
    // Add monitor logic here if applicable
  };

  const handleToggleExpand = (id) => {
    // Toggle the expanded state for the event
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="admin-user-page">
      <h1>Admin User Page</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="event-table-container">
          <table className="event-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <React.Fragment key={event.id}>
                  <tr>
                    <td>{event.id}</td>
                    <td>{event.title}</td>
                    <td>{event.event_date}</td>
                    <td>{event.status}</td>
                    <td>
                      <button
                       
                        className="btn approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="btn delete-btn"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleMonitor(event.id)}
                        className="btn monitor-btn"
                      >
                        Monitor
                      </button>
                      <button
                        onClick={() => handleToggleExpand(event.id)}
                        className="btn expand-btn"
                      >
                        {expandedEvent === event.id ? "Show Less" : "Show More"}
                      </button>
                    </td>
                  </tr>
                  {expandedEvent === event.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="event-details">
                          <p><strong>Description:</strong> {event.description}</p>
                          <p><strong>Location:</strong> {event.location}</p>
                          <p><strong>Category:</strong> {event.category}</p>
                          <p><strong>Organizer:</strong> {event.organizer}</p>
                          <p><strong>Price:</strong> ${event.price}</p>
                          <p><strong>Max Participants:</strong> {event.max_participants}</p>
                          <p><strong>Paid Event:</strong> {event.is_paid ? "Yes" : "No"}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
