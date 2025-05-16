package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.User;

import java.util.Date;

public record AuthResponse(User user, Date expiration) {
}
