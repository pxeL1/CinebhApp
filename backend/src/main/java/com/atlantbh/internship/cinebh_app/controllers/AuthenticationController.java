package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.dtos.AuthRequest;
import com.atlantbh.internship.cinebh_app.dtos.LogoutResponse;
import com.atlantbh.internship.cinebh_app.services.auth.AuthService;
import com.atlantbh.internship.cinebh_app.services.auth.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthenticationController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            return ResponseEntity.ok(authService.login(authRequest, response));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new Error("Authentication failed: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            return ResponseEntity.ok(authService.register(authRequest, response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Error(e.getMessage()));
        }
    }

    @GetMapping("/validate")
    public ResponseEntity validate(HttpServletRequest request) {
        try {
            return ResponseEntity.ok(jwtService.isTokenValid(request));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new Error(e.getMessage()));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseEntity.ok(new LogoutResponse("Logged out successfully"));
    }
}
