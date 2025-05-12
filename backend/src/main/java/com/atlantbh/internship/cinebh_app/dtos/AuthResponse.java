package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.User;

import java.time.Instant;

public record AuthResponse(User user, Instant expiration) {
}
