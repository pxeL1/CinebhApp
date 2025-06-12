package com.atlantbh.internship.cinebh_app.utility;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.Product;
import com.stripe.model.ProductSearchResult;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.ProductSearchParams;

public class StripeUtils {

    private StripeUtils() {}

    public static Customer findOrCreateCustomer(String customerEmail) throws StripeException {
        CustomerSearchParams params = CustomerSearchParams
                .builder()
                .setQuery("email:'" + customerEmail + "'")
                .build();

        CustomerSearchResult searchResult = Customer.search(params);
        if(searchResult.getData().isEmpty()) {
            CustomerCreateParams createParams = CustomerCreateParams
                    .builder()
                    .setEmail(customerEmail)
                    .build();

            return Customer.create(createParams);
        }
        else {
            return searchResult.getData().getFirst();
        }
    }

    public static Product findOrCreateProduct(String productName) throws StripeException {
        ProductSearchParams params = ProductSearchParams
                .builder()
                .setQuery("name:'" + productName + "'")
                .build();

        ProductSearchResult searchResult = Product.search(params);
        if(searchResult.getData().isEmpty()) {
            ProductCreateParams createParams = ProductCreateParams
                    .builder()
                    .setName(productName)
                    .build();
            return Product.create(createParams);
        }
        else {
            return searchResult.getData().getFirst();
        }
    }
}
