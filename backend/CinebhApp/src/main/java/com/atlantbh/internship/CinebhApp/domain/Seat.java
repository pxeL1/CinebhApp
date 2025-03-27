package com.atlantbh.internship.CinebhApp.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String seatNumber;
    private String seatType;
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;
}
