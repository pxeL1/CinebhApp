package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.Movie;
import com.atlantbh.internship.cinebh_app.domain.MovieGenre;
import com.atlantbh.internship.cinebh_app.domain.MovieImage;
import com.atlantbh.internship.cinebh_app.domain.MovieStatus;

import java.time.Instant;
import java.util.List;

public record MovieDTO(Long id, String name, String pgRating, String language, String duration, Instant startDate, Instant endDate, String trailer, String tmdbId, String synopsis, MovieStatus status, List<MovieGenre> genres, List<MovieImage> images) {
    public MovieDTO(Movie movie) {
        this(movie.getId(),
                movie.getName(),
                movie.getPgRating(),
                movie.getLanguage(),
                movie.getDuration(),
                movie.getStartDate(),
                movie.getEndDate(),
                movie.getTrailer(),
                movie.getTmdbId(),
                movie.getSynopsis(),
                movie.getStatus(),
                movie.getGenres(),
                movie.getImages());
    }
}
