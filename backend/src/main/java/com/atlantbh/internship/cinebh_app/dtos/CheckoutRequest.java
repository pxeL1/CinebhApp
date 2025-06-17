package com.atlantbh.internship.cinebh_app.dtos;

public record CheckoutRequest(String customerEmail, PaymentRequest paymentRequest) {
}
