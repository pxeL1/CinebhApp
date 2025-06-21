package com.atlantbh.internship.cinebh_app.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

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
    private Instant date;
    @ManyToOne
    @JoinColumn(name = "cinebh_user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "projection_id")
    private Projection projection;
    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;
    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservedSeat> seats;

    public Reservation(double price, Instant date, User user, Projection projection) {
        this.price = price;
        this.date = date;
        this.user = user;
        this.projection = projection;
    }
}
