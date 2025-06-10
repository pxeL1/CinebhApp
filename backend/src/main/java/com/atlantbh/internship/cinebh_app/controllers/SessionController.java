package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.dtos.SessionResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {

    @GetMapping(value = "/create")
    public ResponseEntity createSession(HttpSession session) {
        String subject = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        if(Objects.equals(subject, "anonymousUser")) {
            return ResponseEntity.status(401).body(new Error("Unauthorized: User is not logged in"));
        }
        session.setAttribute("subject", subject);

        return ResponseEntity.ok(new SessionResponse(subject, session.getMaxInactiveInterval()));
    }
}
