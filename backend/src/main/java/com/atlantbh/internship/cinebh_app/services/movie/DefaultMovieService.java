package com.atlantbh.internship.cinebh_app.services.movie;

import com.atlantbh.internship.cinebh_app.domain.Movie;
import com.atlantbh.internship.cinebh_app.domain.MovieFilterParameters;
import com.atlantbh.internship.cinebh_app.dtos.MovieRequest;
import com.atlantbh.internship.cinebh_app.repositories.MovieRepository;
import com.atlantbh.internship.cinebh_app.utility.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public Page<Movie> getFilteredMovies(Pageable pageable, MovieFilterParameters movieFilterParameters) {
        List<Specification<Movie>> specifications = new ArrayList<>();

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getSearch())) {
            specifications.add(nameContains(movieFilterParameters.getSearch()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getCity())) {
            specifications.add(hasProjectionsInCity(movieFilterParameters.getCity()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getVenue())) {
            specifications.add(hasProjectionsInVenue(movieFilterParameters.getVenue()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getGenres())) {
            specifications.add(hasGenre(movieFilterParameters.getGenres()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getFromTime())) {
            specifications.add(projectionTimeGreaterThan(movieFilterParameters.getFromTime()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getToTime())) {
            specifications.add(projectionTimeLessThan(movieFilterParameters.getToTime()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getDate())) {
            specifications.add(startDateLessThanOrEqualTo(movieFilterParameters.getDate()));
            specifications.add(endDateGreaterThanOrEqualTo(movieFilterParameters.getDate()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getStartDate())) {
            specifications.add(startDateGreaterThanOrEqualTo(movieFilterParameters.getStartDate()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getEndDate())) {
            specifications.add(startDateLessThanOrEqualTo(movieFilterParameters.getEndDate()));
        }

        if(!StringUtils.isNullOrEmpty(movieFilterParameters.getStatus())) {
            specifications.add(movieStatusEquals(movieFilterParameters.getStatus()));
        }

        return movieRepository.findAll(
                Specification.allOf(specifications),
                pageable
        );
    }

    @Override
    public Movie getMovie(Long id) {
        return movieRepository.findById(id).orElseThrow();
    }

    @Override
    public Movie createMovie(MovieRequest movieRequest) {
        Movie movie = new Movie();
        return null;
    }
}
