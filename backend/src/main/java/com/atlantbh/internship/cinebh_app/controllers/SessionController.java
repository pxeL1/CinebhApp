package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.dtos.SessionResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {

    @GetMapping(value = "/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity createSession(HttpSession session) {
        String subject = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        session.setAttribute("subject", subject);

        return ResponseEntity.ok(new SessionResponse(subject, session.getMaxInactiveInterval()));
    }
}
