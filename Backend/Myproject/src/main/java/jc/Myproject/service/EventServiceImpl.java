package jc.Myproject.service;

import jc.Myproject.model.Event;
import jc.Myproject.model.EventStatus;
import jc.Myproject.model.User;
import jc.Myproject.repository.EventRepo;
import jc.Myproject.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @Override
    public Event saveEvent(Event event) {
        Optional<User> userOpt = userRepo.findById(event.getUser().getId());

        // Check if the user exists and has an organization
        if (userOpt.isPresent() && userOpt.get().getRole() != null) {
            event.setStatus(EventStatus.PENDING);  // Default status is PENDING
            return eventRepo.save(event);
        } else {
            throw new IllegalArgumentException("User not found or user has no valid organization");
        }
    }

    @Override
    public Event getEventById(int id) {
        return eventRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteEvent(int id) {
        eventRepo.deleteById(id);
    }

    @Override
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

    @Override
    public Event updateEventStatus(int eventId, EventStatus status) {
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(status);
        return eventRepo.save(event); // Save event with updated status
    }

    @Override
    public List<Event> getEventsByStatus(EventStatus status) {
        return eventRepo.findByStatus(status);
    }

    @Override
    public Event uploadImage(int eventId, MultipartFile image) {
        try {
            Event event = eventRepo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
            event.setImage(image.getBytes());  // Store the image as a byte array
            return eventRepo.save(event);  // Save the updated event
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    @Override
    public List<Event> saveEvents(List<Event> events) {
        for (Event event : events) {
            Optional<User> userOpt = userRepo.findById(event.getUser().getId());
            if (userOpt.isPresent() && userOpt.get().getRole() != null) {
                event.setStatus(EventStatus.APPROVED);  // Set status to APPROVED instead of PENDING
            } else {
                throw new IllegalArgumentException("User not found or user has no valid organization");
            }
        }
        return eventRepo.saveAll(events);  // Save all events in one batch
    }
}
