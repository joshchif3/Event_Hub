package jc.Myproject.controller;

import jc.Myproject.model.Event;
import jc.Myproject.model.EventStatus;
import jc.Myproject.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable int id) {
        Event event = eventService.getEventById(id);
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<List<Event>> createEvents(@RequestBody List<Event> events) {
        if (events == null || events.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Set all events' status to APPROVED
        for (Event event : events) {
            event.setStatus(EventStatus.APPROVED);
        }

        List<Event> savedEvents = eventService.saveEvents(events);
        return ResponseEntity.ok(savedEvents);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable int id, @RequestBody Event eventDetails) {
        Event existingEvent = eventService.getEventById(id);
        if (existingEvent != null) {
            existingEvent.setTitle(eventDetails.getTitle());
            existingEvent.setDescription(eventDetails.getDescription());
            existingEvent.setDate(eventDetails.getDate());
            existingEvent.setLocation(eventDetails.getLocation());
            existingEvent.setCategory(eventDetails.getCategory());
            Event updatedEvent = eventService.saveEvent(existingEvent);
            return ResponseEntity.ok(updatedEvent);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int id) {
        Event event = eventService.getEventById(id);
        if (event != null) {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/attendance")
    public ResponseEntity<Event> updateAttendance(@PathVariable int id, @RequestParam boolean isComing) {
        Event updatedEvent = eventService.updateAttendanceCount(id, isComing);
        return updatedEvent != null ? ResponseEntity.ok(updatedEvent) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Event> approveEvent(@PathVariable int id) {
        Event event = eventService.getEventById(id);
        if (event != null && event.getStatus() == EventStatus.PENDING) {
            event.setStatus(EventStatus.APPROVED);
            Event updatedEvent = eventService.saveEvent(event);
            return ResponseEntity.ok(updatedEvent);
        }
        return ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Event> rejectEvent(@PathVariable int id) {
        Event event = eventService.getEventById(id);
        if (event != null && event.getStatus() == EventStatus.PENDING) {
            event.setStatus(EventStatus.REJECTED);
            Event updatedEvent = eventService.saveEvent(event);
            return ResponseEntity.ok(updatedEvent);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<Event> uploadImage(@PathVariable int id, @RequestParam("image") MultipartFile image) {
        Event updatedEvent = eventService.uploadImage(id, image);
        return updatedEvent != null ? ResponseEntity.ok(updatedEvent) : ResponseEntity.notFound().build();
    }
}
