package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.*;
import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.services.auth.AuthService;
import com.atlantbh.internship.cinebh_app.utility.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthService authService;

    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            AuthDTO authDTO = authService.login(authRequest);
            response.addCookie(CookieUtils.createCookie(CookieUtils.TOKEN_COOKIE, authDTO.token()));

            return ResponseEntity.ok(authDTO.authResponse());
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new Error("Authentication failed: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            AuthDTO authDTO = authService.register(authRequest);
            response.addCookie(CookieUtils.createCookie(CookieUtils.TOKEN_COOKIE, authDTO.token()));

            return ResponseEntity.ok(authDTO.authResponse());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Error(e.getMessage()));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletResponse response) {
        String credentials = SecurityContextHolder.getContext()
                .getAuthentication()
                .getCredentials()
                .toString();
        Cookie cookie = CookieUtils.createCookie(CookieUtils.TOKEN_COOKIE, credentials);
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        authService.logout(credentials);

        return ResponseEntity.ok(new LogoutResponse("Logged out successfully"));
    }
}
