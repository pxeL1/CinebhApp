package com.atlantbh.internship.cinebh_app.config;

import com.atlantbh.internship.cinebh_app.services.auth.BlacklistService;
import com.atlantbh.internship.cinebh_app.services.auth.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final BlacklistService blacklistService;

    public JwtAuthenticationFilter(JwtService jwtService, BlacklistService blacklistService) {
        this.jwtService = jwtService;
        this.blacklistService = blacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String bearerToken = request.getHeader("Authorization");
            String token = jwtService.extractToken(bearerToken);

            if(token == null){
                filterChain.doFilter(request, response);
                return;
            }

            if(blacklistService.isTokenBlacklisted(token)){
                filterChain.doFilter(request, response);
                return;
            }

            Claims claims = jwtService.resolveClaims(token);

            if(claims != null && jwtService.validateExpiration(claims)) {
                String email = claims.getSubject();
                List<String> roles = claims.get("roles", List.class);
                List<SimpleGrantedAuthority> auhtorities = roles.stream().map(SimpleGrantedAuthority::new).toList();
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, token, auhtorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        filterChain.doFilter(request, response);
    }
}
