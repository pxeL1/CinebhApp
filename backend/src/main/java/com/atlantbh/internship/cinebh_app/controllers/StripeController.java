package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.domain.Seat;
import com.atlantbh.internship.cinebh_app.dtos.CheckoutRequest;
import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.services.stripe.StripeService;
import com.atlantbh.internship.cinebh_app.utility.StringUtils;
import com.stripe.exception.StripeException;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stripe")
public class StripeController {
    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/checkout")
    public ResponseEntity getCheckoutSession(@RequestBody List<Seat> seats, HttpSession session) {
        String customerEmail = session.getAttribute("subject").toString();

        if (StringUtils.isNullOrEmpty(customerEmail)) {
            return ResponseEntity.status(401).body(new Error("Invalid session"));
        }

        try {
            return ResponseEntity.ok(stripeService.getCheckoutSession(new CheckoutRequest(customerEmail, seats)));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(new Error(e.getMessage()));
        }
    }
}
