package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.dtos.LoginRequest;
import com.atlantbh.internship.cinebh_app.dtos.AuthResponse;
import com.atlantbh.internship.cinebh_app.dtos.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest, HttpServletResponse response);
    AuthResponse register(RegisterRequest registerRequest, HttpServletResponse response);
    boolean logout(HttpServletRequest request, HttpServletResponse response);
}
