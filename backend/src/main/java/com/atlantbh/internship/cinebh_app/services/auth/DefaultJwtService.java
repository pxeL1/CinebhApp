package com.atlantbh.internship.cinebh_app.services.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ClaimsBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@NoArgsConstructor
@Service
public class DefaultJwtService implements JwtService {
    @Value("${config.secret-key}")
    private String SECRET_KEY;
    public static final String ROLES_CLAIM = "roles";

    @Override
    public String createToken(String subject, Map<String, Object> claimsMap, Date expiration) {
        ClaimsBuilder claimsBuilder = Jwts.claims()
                .subject(subject);
        claimsMap.forEach(claimsBuilder::add);
        Claims claims = claimsBuilder.build();

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
    public boolean isTokenValid(String token) {
        try {
            resolveClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private Key getSignInKey() {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
