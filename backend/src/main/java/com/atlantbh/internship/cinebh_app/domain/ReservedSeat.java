package com.atlantbh.internship.cinebh_app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "reserved_seat",
        indexes = {@Index(name = "idx_seat_reservation", columnList = "seat_id, reservation_id")})
public class ReservedSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
    @ManyToOne
    @JoinColumn(name = "reservation_id")
    @JsonIgnore
    private Reservation reservation;

    public ReservedSeat(Reservation reservation, Seat seat) {
        this.reservation = reservation;
        this.seat = seat;
    }
}
