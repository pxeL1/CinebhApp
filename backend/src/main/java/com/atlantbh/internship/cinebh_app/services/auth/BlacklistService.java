package com.atlantbh.internship.cinebh_app.services.auth;

public interface BlacklistService {
    void addBlacklistedToken(String token);
    boolean isTokenBlacklisted(String token);
}
