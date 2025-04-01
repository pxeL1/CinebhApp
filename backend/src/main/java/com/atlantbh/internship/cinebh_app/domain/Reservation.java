package com.atlantbh.internship.cinebh_app.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
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
