package jc.Myproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "attendanceCount", nullable = false)
    private Long attendanceCount = 0L;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "event_date", nullable = false)
    private LocalDate date;

    @Column(name = "category")
    private String category;

    @Column(name = "organizer")
    private String organizer;

    @Column(name = "max_participants")
    private int maxParticipants;

    @Column(name = "is_paid")
    private boolean isPaid;

    @Column(name = "price")
    private double price;

}