package com.atlantbh.internship.cinebh_app.services.movie;

import com.atlantbh.internship.cinebh_app.domain.Movie;
import com.atlantbh.internship.cinebh_app.repositories.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static com.atlantbh.internship.cinebh_app.specifications.MovieSpecifications.*;

@Service
public class DefaultMovieService implements MovieService {
    private final MovieRepository movieRepository;

    public DefaultMovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Page<Movie> getAllCurrentMovies(Pageable pageable) {
        return movieRepository.findAll(
                Specification.allOf(startDateLessThanNow(), endDateGreaterThanNow()),
                pageable
        );
    }

    @Override
    public Page<Movie> getAllUpcomingMovies(Pageable pageable) {
        return movieRepository.findAll(
                Specification.allOf(startDateGreaterThanNow(), endDateGreaterThanNow()),
                pageable
        );
    }
}
