package com.atlantbh.internship.cinebh_app.services.stripe;

import com.atlantbh.internship.cinebh_app.domain.Payment;
import com.atlantbh.internship.cinebh_app.services.email.EmailService;
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
    private final EmailService emailService;

    public DefaultStripeService(PaymentService paymentService, EmailService emailService) {
        this.paymentService = paymentService;
        this.emailService = emailService;
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
            Payment payment = paymentService.createPayment(paymentIntent.getMetadata().get("reservation_id"));

            String subject = "Checkout confirmation";
            String emailBody = "Your payment has been processed successfully";
            emailService.sendEmail(payment.getUser().getEmail(), subject, emailBody);
        }
    }
}
