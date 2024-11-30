package jc.Myproject.service;

import jc.Myproject.model.Event;
import jc.Myproject.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepo eventRepo;

    @Override
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepo.save(event);
    }

    @Override
    public Event getEventById(int id) {
        return eventRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteEvent(int id) {
        eventRepo.deleteById(id);
    }

    public Event updateAttendanceCount(int eventId, boolean isComing) {
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        // Increment or Decrement attendance count
        if (isComing) {
            event.setAttendanceCount(event.getAttendanceCount() + 1);
        } else {
            event.setAttendanceCount(event.getAttendanceCount() - 1);
        }

        return eventRepo.save(event); // Save updated event
    }
}
