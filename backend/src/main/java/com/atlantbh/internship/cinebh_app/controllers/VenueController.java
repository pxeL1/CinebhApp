package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.services.venue.VenueService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/venue")
public class VenueController {
    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping
    public ResponseEntity getAllVenuesPage(Pageable pageable) {
        return ResponseEntity.ok(venueService.getAllVenuesPage(pageable));
    }

    @GetMapping(value = "/all")
    public ResponseEntity getAllVenues() {
        return ResponseEntity.ok(venueService.getAllVenues());
    }
}
