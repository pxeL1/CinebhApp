package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@NoArgsConstructor
@Service
public class DefaultJwtService implements JwtService {
    @Value("${config.secret-key}")
    private String SECRET_KEY;
    private static final Duration SHORT_EXPIRATION_TIME = Duration.ofMinutes(30);
    private static final Duration LONG_EXPIRATION_TIME = Duration.ofDays(7);
    public static final String ROLES_CLAIM = "roles";

    @Override
    public String createToken(User user, boolean rememberMe) {
        List<String> roles = user.getRoles()
                .stream()
                .map(role -> role.getRole().getName())
                .toList();
        Claims claims = Jwts.claims()
                .subject(user.getEmail())
                .add(ROLES_CLAIM, roles)
                .build();
        Duration tokenDuration = rememberMe ? LONG_EXPIRATION_TIME : SHORT_EXPIRATION_TIME;
        Date expiration = Date.from(Instant.now().plus(tokenDuration));

        return Jwts.builder()
                .claims(claims)
                .expiration(expiration)
                .signWith(getSignInKey())
                .compact();
    }

    @Override
    public Claims resolveClaims(String token) throws JwtException {
        return Jwts.parser()
                .verifyWith((SecretKey) getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @Override
    public void isTokenValid(String token) {
        resolveClaims(token);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
