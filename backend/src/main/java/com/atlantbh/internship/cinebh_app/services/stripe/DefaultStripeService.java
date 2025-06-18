package com.atlantbh.internship.cinebh_app.services.stripe;

import com.atlantbh.internship.cinebh_app.domain.Payment;
import com.atlantbh.internship.cinebh_app.domain.Reservation;
import com.atlantbh.internship.cinebh_app.repositories.PaymentRepository;
import com.atlantbh.internship.cinebh_app.repositories.ReservationRepository;
import com.atlantbh.internship.cinebh_app.services.email.EmailService;
import com.atlantbh.internship.cinebh_app.services.payment.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.model.Event;

import java.time.Instant;

@Service
public class DefaultStripeService implements StripeService {
    @Value("${stripe.webhook-key}")
    private String webhookKey;
    private final EmailService emailService;
    private final ReservationRepository reservationRepository;
    private final PaymentRepository paymentRepository;

    public DefaultStripeService(EmailService emailService, ReservationRepository reservationRepository, PaymentRepository paymentRepository) {
        this.emailService = emailService;
        this.reservationRepository = reservationRepository;
        this.paymentRepository = paymentRepository;
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
            Payment payment = createPayment(paymentIntent.getMetadata().get("reservation_id"));

            String subject = "Checkout confirmation";
            String emailBody = "Your payment has been processed successfully";
            emailService.sendEmail(payment.getUser().getEmail(), subject, emailBody);
        }
    }

    private Payment createPayment(String reservationId) {
        Reservation reservation = reservationRepository.findById(Long.valueOf(reservationId)).orElseThrow();

        Payment payment = paymentRepository.save(new Payment(Instant.now(), reservation.getUser(), reservation));
        reservation.setPayment(payment);
        reservationRepository.save(reservation);

        return payment;
    }
}
