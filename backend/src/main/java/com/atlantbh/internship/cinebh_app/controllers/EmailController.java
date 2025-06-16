package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.services.email.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/email")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping(value = "/checkout")
    public ResponseEntity sendCheckoutEmail(@RequestParam String recipient) {
        String subject = "Checkout Confirmation";
        String body = "Your payment has been processed successfully.";

        return ResponseEntity.ok(emailService.sendEmail(recipient, subject, body));
    }
}
