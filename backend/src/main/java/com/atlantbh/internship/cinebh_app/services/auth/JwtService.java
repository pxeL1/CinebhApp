package com.atlantbh.internship.cinebh_app.services.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

public interface JwtService {
    String createToken(String subject, Map<String, Object> claimsMap, Date expiration);
    Claims resolveClaims(String token) throws JwtException;
    boolean isTokenValid(String token);
}
