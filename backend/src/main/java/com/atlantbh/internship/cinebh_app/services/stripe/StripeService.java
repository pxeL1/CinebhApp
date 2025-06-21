package com.atlantbh.internship.cinebh_app.services.stripe;

public interface StripeService {
    void webhookEvent(String body, String signatureHeader);
}
