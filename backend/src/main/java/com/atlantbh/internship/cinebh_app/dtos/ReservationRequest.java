package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Seat;

import java.time.Instant;
import java.util.List;

public record ReservationRequest(double price, Instant date, Long projection_id, List<Seat> seats) {
}
