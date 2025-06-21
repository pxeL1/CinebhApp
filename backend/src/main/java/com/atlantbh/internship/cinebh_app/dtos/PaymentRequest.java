package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Seat;

import java.time.Instant;
import java.util.List;

public record PaymentRequest(Instant date, Long projectionId, List<Seat> seats) {
}
