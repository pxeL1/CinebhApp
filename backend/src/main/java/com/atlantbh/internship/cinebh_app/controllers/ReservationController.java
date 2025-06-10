package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.dtos.ReservationDTO;
import com.atlantbh.internship.cinebh_app.dtos.ReservationRequest;
import com.atlantbh.internship.cinebh_app.services.reservation.ReservationService;
import com.atlantbh.internship.cinebh_app.utility.StringUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity createReservation(@RequestBody ReservationRequest reservationRequest, HttpSession session) {
        String username = session.getAttribute("subject").toString();

        if(StringUtils.isNullOrEmpty(username)) {
            ResponseEntity.status(401).body(new Error("Session invalid"));
        }

        try {
            return ResponseEntity.ok(reservationService.createReservation(new ReservationDTO(reservationRequest, username)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new Error(e.getMessage()));
        }
    }
}
