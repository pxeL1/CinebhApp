package com.atlantbh.internship.cinebh_app.services.stripe;

import com.atlantbh.internship.cinebh_app.services.payment.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.model.Event;

@Service
public class DefaultStripeService implements StripeService {
    @Value("${stripe.webhook-key}")
    private String webhookKey;
    private final PaymentService paymentService;

    public DefaultStripeService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Override
    public void webhookEvent(String body, String signatureHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(body, signatureHeader, webhookKey);
        } catch (SignatureVerificationException e) {
            throw new RuntimeException(e);
        }

        if (event.getType().equals("payment_intent.succeeded")) {
            PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElseThrow();
            paymentService.createPayment(paymentIntent.getMetadata().get("reservation_id"));
        }
    }
}
