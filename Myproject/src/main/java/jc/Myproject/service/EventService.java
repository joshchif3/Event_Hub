package jc.Myproject.service;

import jc.Myproject.model.Event;

import java.util.List;

public interface EventService {
    List<Event> getAllEvents();

    Event saveEvent(Event event);

    Event getEventById(int id);

    void deleteEvent(int id);

    Event updateAttendanceCount(int eventId, boolean isComing);
}
