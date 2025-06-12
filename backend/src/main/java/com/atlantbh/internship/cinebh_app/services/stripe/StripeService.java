package com.atlantbh.internship.cinebh_app.services.stripe;

import com.atlantbh.internship.cinebh_app.dtos.CheckoutRequest;
import com.atlantbh.internship.cinebh_app.dtos.CheckoutResponse;
import com.stripe.exception.StripeException;

public interface StripeService {
    CheckoutResponse getCheckoutSession(CheckoutRequest checkoutRequest) throws StripeException;
}
