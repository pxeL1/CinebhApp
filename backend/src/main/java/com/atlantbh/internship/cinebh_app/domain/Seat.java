package com.atlantbh.internship.cinebh_app.domain;

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
    @Column(nullable = false)
    private String number;
    @Column(nullable = false)
    private SeatType type;
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;
}
