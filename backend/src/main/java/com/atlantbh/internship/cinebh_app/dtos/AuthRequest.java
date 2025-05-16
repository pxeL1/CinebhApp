package com.atlantbh.internship.cinebh_app.dtos;

public record AuthRequest(String email, String password, boolean rememberMe) {
}
