package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;

public interface JwtService {
    String createToken(User user, boolean rememberMe);
    Claims resolveClaims(String token) throws JwtException;
    void isTokenValid(String token);
}
