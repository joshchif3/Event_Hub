package jc.Myproject.repository;

import jc.Myproject.model.Event;
import jc.Myproject.model.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepo extends JpaRepository<Event, Integer> {
    // Find events by organizer ID (user ID)
    List<Event> findByUserId(int userId);

    // Method to find events by status
    List<Event> findByStatus(EventStatus status);
}
