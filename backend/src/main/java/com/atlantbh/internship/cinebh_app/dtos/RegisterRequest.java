package com.atlantbh.internship.cinebh_app.dtos;

public record RegisterRequest(String email, String password, String role, boolean rememberMe) {
}
