package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.dtos.ReservationRequest;
import com.atlantbh.internship.cinebh_app.services.reservation.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity deleteReservation(@PathVariable Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            reservationService.deleteReservation(id, userEmail);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Error(e.getMessage()));
        }
    }
}
