package com.atlantbh.internship.cinebh_app.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "reservation",
        indexes = {@Index(name = "idx_reservation_projection", columnList = "projection_id")})
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double price;
    @ManyToOne
    @JoinColumn(name = "cinebh_user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "projection_id")
    private Projection projection;
    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;
}
