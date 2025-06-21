package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.dtos.PaymentRequest;
import com.atlantbh.internship.cinebh_app.services.payment.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/checkout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getCheckoutSession(@RequestBody PaymentRequest paymentRequest) {
        String customerEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            return ResponseEntity.ok(paymentService.getCheckoutSession(customerEmail, paymentRequest));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(new Error(e.getMessage()));
        }
    }
}
