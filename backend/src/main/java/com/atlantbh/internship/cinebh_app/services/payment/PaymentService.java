package com.atlantbh.internship.cinebh_app.services.payment;

import com.atlantbh.internship.cinebh_app.domain.Payment;
import com.atlantbh.internship.cinebh_app.dtos.CheckoutResponse;
import com.atlantbh.internship.cinebh_app.dtos.PaymentRequest;
import com.stripe.exception.StripeException;

public interface PaymentService {
    CheckoutResponse getCheckoutSession(String customerEmail, PaymentRequest paymentRequest) throws StripeException;
    Payment createPayment(String reservationId);
}
