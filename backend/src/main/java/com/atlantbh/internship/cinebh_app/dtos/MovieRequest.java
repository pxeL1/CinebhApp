package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.MovieStatus;

import java.time.Instant;
import java.util.List;

public record MovieRequest(String name, String pgRating, String language, String duration, Instant startDate, Instant endDate, String trailer, String tmdbId, String synopsis, MovieStatus status, List<String> genres, List<MovieImageRequest> images, List<ProjectionRequest> projections, List<PersonnelRequest> personnel) {
}
