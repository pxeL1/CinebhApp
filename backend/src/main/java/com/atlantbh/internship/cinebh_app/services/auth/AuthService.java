package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.dtos.AuthRequest;
import com.atlantbh.internship.cinebh_app.dtos.AuthResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest, HttpServletResponse response);
    AuthResponse register(AuthRequest authRequest, HttpServletResponse response);
    void logout(HttpServletRequest request, HttpServletResponse response);
}
