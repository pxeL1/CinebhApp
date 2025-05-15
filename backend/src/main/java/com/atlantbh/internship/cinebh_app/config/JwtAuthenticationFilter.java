package com.atlantbh.internship.cinebh_app.config;

import com.atlantbh.internship.cinebh_app.services.auth.TokenBlacklistService;
import com.atlantbh.internship.cinebh_app.services.auth.JwtService;
import com.atlantbh.internship.cinebh_app.utility.CookieUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static com.atlantbh.internship.cinebh_app.services.auth.DefaultJwtService.ROLES_CLAIM;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final TokenBlacklistService tokenBlacklistService;

    public JwtAuthenticationFilter(JwtService jwtService, TokenBlacklistService tokenBlacklistService) {
        this.jwtService = jwtService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = null;
            if(request.getCookies() != null) {
                token = Arrays.stream(request.getCookies())
                        .filter(cookie -> cookie.getName().equals(CookieUtils.TOKEN_COOKIE))
                        .map(Cookie::getValue)
                        .findFirst()
                        .orElse(null);
            }

            if(token == null){
                filterChain.doFilter(request, response);
                return;
            }

            if(tokenBlacklistService.isTokenBlacklisted(token)){
                filterChain.doFilter(request, response);
                return;
            }

            try {
                Claims claims = jwtService.resolveClaims(token);
                String email = claims.getSubject();
                List<String> roles = claims.get(ROLES_CLAIM, List.class);
                List<SimpleGrantedAuthority> authorities = roles.stream().map(SimpleGrantedAuthority::new).toList();
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, token, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JwtException e) {
                logger.error(e.getMessage());
                filterChain.doFilter(request, response);
                return;
            }
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        filterChain.doFilter(request, response);
    }
}
