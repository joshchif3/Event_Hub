package jc.Myproject.service;

import jc.Myproject.model.Event;
import jc.Myproject.model.EventStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EventService {
    List<Event> getAllEvents();

    Event saveEvent(Event event);

    Event getEventById(int id);

    void deleteEvent(int id);

    Event updateAttendanceCount(int eventId, boolean isComing);

    // Admin functions to approve/reject events
    Event updateEventStatus(int eventId, EventStatus status);

    // Get events by status (Admin can fetch pending events)
    List<Event> getEventsByStatus(EventStatus status);

    // Method for uploading an image for the event
    Event uploadImage(int eventId, MultipartFile image);

    // Method for saving multiple events
    List<Event> saveEvents(List<Event> events);
}
