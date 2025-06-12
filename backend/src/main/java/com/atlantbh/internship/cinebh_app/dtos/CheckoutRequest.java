package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Seat;

import java.util.List;

public record CheckoutRequest(String customerEmail, List<Seat> seats) {
}
