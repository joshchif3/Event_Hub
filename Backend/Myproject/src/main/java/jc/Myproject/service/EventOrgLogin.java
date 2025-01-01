package jc.Myproject.service;

import jc.Myproject.model.Event;
import java.util.List;

public interface EventOrgLogin {

    // Method to get all events created by the organizer
    List<Event> getAllEventsByOrganizer(int organizerId);

    // Method to create a new event
    Event createEvent(int organizerId, Event event);

    // Method to delete an event created by the organizer
    boolean deleteEvent(int eventId, int organizerId);

    // Method to monitor a specific event created by the organizer
    Event monitorEvent(int eventId, int organizerId);

    // Method to update an event created by the organizer
    Event updateEvent(int eventId, int organizerId, Event updatedEvent);
}
