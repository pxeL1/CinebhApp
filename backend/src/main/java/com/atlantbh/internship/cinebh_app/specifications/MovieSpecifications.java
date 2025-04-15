package com.atlantbh.internship.cinebh_app.specifications;

import com.atlantbh.internship.cinebh_app.domain.Movie;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;

public class MovieSpecifications {
    public static Specification<Movie> startDateLessThanNow() {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("startDate"), Instant.now());
    }

    public static Specification<Movie> startDateGreaterThanNow() {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("startDate"), Instant.now());
    }

    public static Specification<Movie> endDateGreaterThanNow() {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("endDate"), Instant.now());
    }

    public static Specification<Movie> endDateLessThanNow() {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("endDate"), Instant.now());
    }
}
