package jc.Myproject.service;

import jc.Myproject.model.Event;
import jc.Myproject.model.User;
import jc.Myproject.model.UserRole;
import jc.Myproject.model.EventStatus;
import jc.Myproject.repository.EventRepo;  // Correct import for EventRepo
import jc.Myproject.repository.UserRepo;  // Correct import for UserRepo
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventOrgLoginImpl implements EventOrgLogin {

    @Autowired
    private EventRepo eventRepository;  // Use EventRepo here

    @Autowired
    private UserRepo userRepository;  // Corrected to use UserRepo here

    // Get all events created by the event organizer
    @Override
    public List<Event> getAllEventsByOrganizer(int organizerId) {
        return eventRepository.findByUserId(organizerId);  // Ensure that the method is implemented in the repository
    }

    // Create a new event
    @Override
    public Event createEvent(int organizerId, Event event) {
        Optional<User> user = userRepository.findById(organizerId);
        if (user.isPresent() && user.get().getRole() == UserRole.EVENT_ORGANIZER) {
            event.setUser(user.get()); // Assign the event to the organizer
            event.setStatus(EventStatus.PENDING); // Default status for new events
            return eventRepository.save(event);
        }
        throw new IllegalArgumentException("User is not an event organizer or does not exist");
    }

    // Delete an event created by the event organizer
    @Override
    public boolean deleteEvent(int eventId, int organizerId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isPresent() && event.get().getUser().getId() == organizerId) {
            eventRepository.delete(event.get());
            return true;
        }
        throw new IllegalArgumentException("Event not found or not created by this organizer");
    }

    // Monitor a specific event's details (status, attendance, etc.)
    @Override
    public Event monitorEvent(int eventId, int organizerId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isPresent() && event.get().getUser().getId() == organizerId) {
            return event.get(); // Return event details
        }
        throw new IllegalArgumentException("Event not found or not created by this organizer");
    }

    // Update event (example: updating the event status or other fields)

    @Override
    public Event updateEvent(int eventId, int organizerId, Event updatedEvent) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isPresent() && event.get().getUser().getId() == organizerId) {
            event.get().setTitle(updatedEvent.getTitle());
            event.get().setDescription(updatedEvent.getDescription());
            event.get().setLocation(updatedEvent.getLocation());
            event.get().setDate(updatedEvent.getDate());
            event.get().setCategory(updatedEvent.getCategory());
            event.get().setMaxParticipants(updatedEvent.getMaxParticipants());
            event.get().setPaid(updatedEvent.isPaid()); // Correct method call
            event.get().setPrice(updatedEvent.getPrice());
            return eventRepository.save(event.get());
        }
        throw new IllegalArgumentException("Event not found or not created by this organizer");

    }

}
