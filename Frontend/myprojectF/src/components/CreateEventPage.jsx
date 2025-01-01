import React, { useState } from "react";
import "../styling/CreateEventPage.css"; // Assuming you have CSS for styling
import { createEvent } from "../service/api"; // Assuming createEvent API call is available
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("TECHNOLOGY"); // Default category value
  const [eventOrganizer, setEventOrganizer] = useState("Tech Corp"); // Default organizer value
  const [maxParticipants, setMaxParticipants] = useState(200); // Default maxParticipants
  const [isPaid, setIsPaid] = useState(true); // Default isPaid value
  const [eventPrice, setEventPrice] = useState(50.00); // Default event price
  const [eventImage, setEventImage] = useState(null); // For image upload
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEventCreation = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !eventName ||
      !eventDescription ||
      !eventDate ||
      !eventLocation ||
      !eventCategory ||
      !eventOrganizer ||
      !maxParticipants ||
      !eventPrice
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Prepare the event data as an array
    const eventData = [{
      title: eventName,
      description: eventDescription,
      date: eventDate,
      location: eventLocation,
      category: eventCategory, // Ensure category is valid
      organizer: eventOrganizer, // Event organizer
      maxParticipants: maxParticipants, // Max participants for the event
      isPaid: isPaid, // Whether the event is paid or not
      price: eventPrice, // Event price
      user: {
        id: 1, // Assuming the user ID is static or dynamic
      },
    }];

    // Add the image if it's provided
    if (eventImage) {
      const formData = new FormData();
      formData.append("eventData", JSON.stringify(eventData));
      formData.append("image", eventImage);

      try {
        const createdEvent = await createEvent(formData); // API call to create event
        if (createdEvent) {
          alert("Event created successfully!");
          navigate("/events"); // Redirect to events page after creation
        }
      } catch (error) {
        setErrorMessage("Error creating event. Please try again.");
        console.error("Error creating event:", error);
      }
    } else {
      try {
        const createdEvent = await createEvent(eventData); // API call without image
        if (createdEvent) {
          alert("Event created successfully!");
          navigate("/events"); // Redirect to events page after creation
        }
      } catch (error) {
        setErrorMessage("Error creating event. Please try again.");
        console.error("Error creating event:", error);
      }
    }
  };

  return (
    <div className="create-event-page-container">
      <h2>Create Event</h2>
      <form onSubmit={handleEventCreation}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Description</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Location</label>
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Category</label>
          <select
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            required
          >
            <option value="BUSINESS">Business</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="MUSIC">Music</option>
            <option value="SPORTS">Sports</option>
          </select>
        </div>
        <div className="form-group">
          <label>Event Organizer</label>
          <input
            type="text"
            value={eventOrganizer}
            onChange={(e) => setEventOrganizer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Max Participants</label>
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Is Paid Event?</label>
          <select
            value={isPaid}
            onChange={(e) => setIsPaid(e.target.value === "true")}
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Event Price</label>
          <input
            type="number"
            value={eventPrice}
            onChange={(e) => setEventPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Image (Optional)</label>
          <input
            type="file"
            onChange={(e) => setEventImage(e.target.files[0])}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
