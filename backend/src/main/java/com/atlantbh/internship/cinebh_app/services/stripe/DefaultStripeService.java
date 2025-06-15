package com.atlantbh.internship.cinebh_app.services.stripe;

import com.atlantbh.internship.cinebh_app.domain.Seat;
import com.atlantbh.internship.cinebh_app.dtos.CheckoutRequest;
import com.atlantbh.internship.cinebh_app.dtos.CheckoutResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Objects;

import static com.atlantbh.internship.cinebh_app.utility.StripeUtils.findOrCreateCustomer;
import static com.atlantbh.internship.cinebh_app.utility.StripeUtils.findOrCreateProduct;

@Service
public class DefaultStripeService implements StripeService {
    private final String STRIPE_API_KEY = System.getenv("STRIPE_API_KEY");
    private final String CLIENT_BASE_URL = System.getenv("CLIENT_BASE_URL");

    @Override
    public CheckoutResponse getCheckoutSession(CheckoutRequest checkoutRequest) throws StripeException {
        Stripe.apiKey = STRIPE_API_KEY;
        Customer customer = findOrCreateCustomer(checkoutRequest.customerEmail());

        SessionCreateParams.Builder paramsBuilder = SessionCreateParams
                .builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer.getId())
                .setSuccessUrl(CLIENT_BASE_URL + "checkout/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(CLIENT_BASE_URL + "checkout/failure");

        for (Seat seat : checkoutRequest.seats()) {
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

    private PriceData getSeatPriceData(Product product) {
        PriceData.Builder priceBuilder = PriceData.builder()
                .setCurrency("BAM")
                .setProductData(
                        PriceData.ProductData.builder()
                                .putMetadata("app_id", product.getId())
                                .setName(product.getName())
                                .build()
                );

        if(Objects.equals(product.getName(), "REGULAR")) {
            priceBuilder.setUnitAmountDecimal(BigDecimal.valueOf(700));
        }
        else if(Objects.equals(product.getName(), "VIP")) {
            priceBuilder.setUnitAmountDecimal(BigDecimal.valueOf(1000));
        }
        else if(Objects.equals(product.getName(), "LOVE")) {
            priceBuilder.setUnitAmountDecimal(BigDecimal.valueOf(2400));
        }

        return priceBuilder.build();
    }
}
