package com.atlantbh.internship.cinebh_app.specifications;

import com.atlantbh.internship.cinebh_app.domain.*;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.time.LocalTime;
import java.util.List;

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

    public static Specification<Movie> nameContains(String search) {
        return (root, query, builder) -> builder.like(builder.lower(root.get("name")), "%" + search.toLowerCase() + "%");
    }

    public static Specification<Movie> hasProjectionsInCity(String city) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Movie, Projection> projectionJoin = root.join("projections");
            Join<Projection, Hall> hallJoin = projectionJoin.join("hall");
            Join<Hall, Venue> venueJoin = hallJoin.join("venue");
            Join<Venue, City> cityJoin = venueJoin.join("city");

            return builder.equal(cityJoin.get("name"), city);
        };
    }

    public static Specification<Movie> hasProjectionsInVenue(String venue) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Movie, Projection> projectionJoin = root.join("projections");
            Join<Projection, Hall> hallJoin = projectionJoin.join("hall");
            Join<Hall, Venue> venueJoin = hallJoin.join("venue");

            return builder.equal(venueJoin.get("name"), venue);
        };
    }

    public static Specification<Movie> hasGenre(List<String> genre) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Movie, MovieGenre> movieGenreJoin = root.join("genres");
            Join<MovieGenre, Genre> genreJoin = movieGenreJoin.join("genre");

            return genreJoin.get("name").in(genre);
        };
    }

    public static Specification<Movie> projectionTimeGreaterThan(String fromTime) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Movie, Projection> projectionJoin = root.join("projections");

            return builder.greaterThanOrEqualTo(projectionJoin.get("time"), LocalTime.parse(fromTime));
        };
    }

    public static Specification<Movie> projectionTimeLessThan(String toTime) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Movie, Projection> projectionJoin = root.join("projections");

            return builder.lessThanOrEqualTo(projectionJoin.get("time"), LocalTime.parse(toTime));
        };
    }

    public static Specification<Movie> startDateLessThanOrEqualTo(String date) {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("startDate"), Instant.parse(date));
    }

    public static Specification<Movie> endDateGreaterThanOrEqualTo(String date) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("endDate"), Instant.parse(date));
    }

    public static Specification<Movie> startDateGreaterThanOrEqualTo(String date) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("startDate"), Instant.parse(date));
    }

    public static Specification<Movie> movieStatusEquals(String status) {
        return (root, query, builder) -> builder.equal(root.get("status"), MovieStatus.valueOf(status));
    }
}
