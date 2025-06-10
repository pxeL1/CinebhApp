package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Hall;
import com.atlantbh.internship.cinebh_app.domain.Projection;

import java.time.LocalTime;

public record ProjectionDTO(Long id, LocalTime time, MovieDTO movie, Hall hall) {
    public ProjectionDTO(Projection projection) {
        this(projection.getId(),
                projection.getTime(),
                new MovieDTO(projection.getMovie()),
                projection.getHall());
    }
}
