package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.dtos.AuthDTO;
import com.atlantbh.internship.cinebh_app.dtos.AuthRequest;

public interface AuthService {
    AuthDTO login(AuthRequest authRequest);
    AuthDTO register(AuthRequest authRequest);
    void logout(String credentials);
    void validate(String credentials);
}
