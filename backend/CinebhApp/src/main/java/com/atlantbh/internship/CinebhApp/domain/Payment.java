package com.atlantbh.internship.CinebhApp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Instant date;
    @ManyToOne
    @JoinColumn(name = "cinebh_user_id")
    private User user;
    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;
}
