package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.services.seat.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("api/v1/seat")
public class SeatController {
    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping(value = "/projection/{id}/{date}")
    public ResponseEntity getSeatsForProjection(@PathVariable Long id, @PathVariable Instant date) {
        try{
            return ResponseEntity.ok(seatService.getSeatsForProjection(id, date));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
