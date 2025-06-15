package com.atlantbh.internship.cinebh_app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Objects;

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
    @Column(nullable = false)
    private String stripeSessionId;
    @ManyToOne
    @JoinColumn(name = "cinebh_user_id")
    private User user;
    @OneToOne
    @JoinColumn(name = "reservation_id")
    @JsonIgnore
    private Reservation reservation;

    public Payment(Instant date, String stripeSessionId, User user, Reservation reservation) {
        this.date = date;
        this.stripeSessionId = stripeSessionId;
        this.user = user;
        this.reservation = reservation;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
