package com.atlantbh.internship.cinebh_app.domain;

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
    @Column(nullable = false)
    private Instant date;
    @ManyToOne
    @JoinColumn(name = "cinebh_user_id")
    private User user;
    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public Payment(Instant date, User user, Reservation reservation) {
        this.date = date;
        this.user = user;
        this.reservation = reservation;
    }
}
