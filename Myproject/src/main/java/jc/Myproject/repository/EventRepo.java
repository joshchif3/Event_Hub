package jc.Myproject.repository;

import jc.Myproject.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {
    // Additional custom query methods can be added here if needed
}
