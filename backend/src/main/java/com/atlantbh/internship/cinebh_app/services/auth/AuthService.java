package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.domain.User;
import com.atlantbh.internship.cinebh_app.dtos.LoginRequest;
import com.atlantbh.internship.cinebh_app.dtos.LogoutRequest;
import com.atlantbh.internship.cinebh_app.dtos.RegisterRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    User login(LoginRequest loginRequest, HttpServletResponse response);
    User register(RegisterRequest registerRequest, HttpServletResponse response);
    boolean logout(LogoutRequest logoutRequest);
}
