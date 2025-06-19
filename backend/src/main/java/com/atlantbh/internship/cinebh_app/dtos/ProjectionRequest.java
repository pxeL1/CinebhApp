package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Hall;

import java.time.LocalTime;

public record ProjectionRequest(LocalTime time, Hall hall) {
}
