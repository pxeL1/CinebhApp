package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Genre;
import com.atlantbh.internship.cinebh_app.domain.MovieStatus;

import java.time.Instant;
import java.util.List;

public record MovieRequest(Long id, String name, String pgRating, String language, String duration, Instant startDate, Instant endDate, String trailer, String tmdbId, String synopsis, MovieStatus status, List<Genre> genres, List<MovieImageDTO> images, List<ProjectionRequest> projections) {
}
