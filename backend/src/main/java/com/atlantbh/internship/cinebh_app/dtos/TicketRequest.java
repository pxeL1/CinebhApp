package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Seat;

import java.time.Instant;
import java.util.List;

public record TicketRequest(double price, Instant date, String userEmail, Long projectionId, String stripeSessionId, List<Seat> seats) {
}
