package com.atlantbh.internship.cinebh_app.services.auth;

import io.jsonwebtoken.JwtException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class DefaultBlacklistService implements BlacklistService {
    private final JwtService jwtService;
    private final List<String> blacklistedTokens = new ArrayList<>();

    public DefaultBlacklistService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void addBlacklistedToken(String token) {
        blacklistedTokens.add(token);
    }

    @Override
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    @Scheduled(fixedDelay = 30, timeUnit = TimeUnit.MINUTES)
    public void cleanExpiredTokens() {
        blacklistedTokens.forEach(blacklistedToken -> {
            try {
                jwtService.resolveClaims(blacklistedToken);
            } catch (JwtException e) {
                blacklistedTokens.remove(blacklistedToken);
            }
        });
    }
}
