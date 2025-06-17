package com.atlantbh.internship.cinebh_app.services.payment;

import com.atlantbh.internship.cinebh_app.domain.Payment;
import com.atlantbh.internship.cinebh_app.domain.Reservation;
import com.atlantbh.internship.cinebh_app.domain.Seat;
import com.atlantbh.internship.cinebh_app.domain.SeatType;
import com.atlantbh.internship.cinebh_app.dtos.CheckoutResponse;
import com.atlantbh.internship.cinebh_app.dtos.PaymentRequest;
import com.atlantbh.internship.cinebh_app.dtos.ReservationRequest;
import com.atlantbh.internship.cinebh_app.repositories.PaymentRepository;
import com.atlantbh.internship.cinebh_app.repositories.ReservationRepository;
import com.atlantbh.internship.cinebh_app.services.reservation.ReservationService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

import static com.atlantbh.internship.cinebh_app.utility.StripeUtils.findOrCreateCustomer;
import static com.atlantbh.internship.cinebh_app.utility.StripeUtils.findOrCreateProduct;

@Service
public class StripePaymentService implements PaymentService {
    @Value("${stripe.api-key}")
    private String STRIPE_API_KEY;
    @Value("${stripe.client-base-url}")
    private String CLIENT_BASE_URL;
    private final PaymentRepository paymentRepository;
    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

    public StripePaymentService(PaymentRepository paymentRepository, ReservationService reservationService, ReservationRepository reservationRepository) {
        this.paymentRepository = paymentRepository;
        this.reservationService = reservationService;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public CheckoutResponse getCheckoutSession(String customerEmail, PaymentRequest paymentRequest) throws StripeException {
        Stripe.apiKey = STRIPE_API_KEY;
        Customer customer = findOrCreateCustomer(customerEmail);

        Reservation reservation = reservationService.createReservation(new ReservationRequest(paymentRequest.date(), customerEmail, paymentRequest.projectionId(), paymentRequest.seats()));

        SessionCreateParams.Builder paramsBuilder = SessionCreateParams
                .builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer.getId())
                .setSuccessUrl(CLIENT_BASE_URL + "checkout/success")
                .setCancelUrl(CLIENT_BASE_URL + "checkout/failure?reservation_id=" + reservation.getId())
                .setPaymentIntentData(SessionCreateParams.PaymentIntentData.builder().
                        putMetadata("reservation_id", reservation.getId().toString())
                        .build());

        for (Seat seat : paymentRequest.seats()) {
            Product product = findOrCreateProduct(seat.getType().name());

            paramsBuilder.addLineItem(
                    SessionCreateParams.LineItem
                            .builder()
                            .setQuantity(1L)
                            .setPriceData(getSeatPriceData(product))
                            .build()
            );
        }

        String sessionUrl = Session.create(paramsBuilder.build()).getUrl();

        return new CheckoutResponse(sessionUrl);
    }

    @Override
    @Transactional
    public Payment createPayment(String reservationId) {
        Reservation reservation = reservationRepository.findById(Long.valueOf(reservationId)).orElseThrow();

        Payment payment = paymentRepository.save(new Payment(Instant.now(), reservation.getUser(), reservation));
        reservation.setPayment(payment);
        reservationRepository.save(reservation);

        return payment;
    }

    private PriceData getSeatPriceData(Product product) {
        PriceData.Builder priceBuilder = PriceData.builder()
                .setCurrency("BAM")
                .setProductData(
                        PriceData.ProductData.builder()
                                .putMetadata("product_id", product.getId())
                                .setName(product.getName())
                                .build()
                );

        if(Objects.equals(product.getName(), SeatType.REGULAR.name())) {
            priceBuilder.setUnitAmountDecimal(BigDecimal.valueOf(700));
        }
        else if(Objects.equals(product.getName(), SeatType.VIP.name())) {
            priceBuilder.setUnitAmountDecimal(BigDecimal.valueOf(1000));
        }
        else if(Objects.equals(product.getName(), SeatType.LOVE.name())) {
            priceBuilder.setUnitAmountDecimal(BigDecimal.valueOf(2400));
        }

        return priceBuilder.build();
    }
}
