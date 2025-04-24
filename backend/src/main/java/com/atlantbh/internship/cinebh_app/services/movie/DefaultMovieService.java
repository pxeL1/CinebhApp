package com.atlantbh.internship.cinebh_app.services.movie;

import com.atlantbh.internship.cinebh_app.domain.Movie;
import com.atlantbh.internship.cinebh_app.domain.MovieFilterParameters;
import com.atlantbh.internship.cinebh_app.repositories.MovieRepository;
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

        if(movieFilterParameters.getType() != null) {
            if(movieFilterParameters.getType().equals("current")) {
                specifications.add(startDateLessThanNow());
            }
            else if(movieFilterParameters.getType().equals("upcoming")) {
                specifications.add(startDateGreaterThanNow());
            }
            specifications.add(endDateGreaterThanNow());
        }

        if(movieFilterParameters.getSearch() != null) {
            specifications.add(nameContains(movieFilterParameters.getSearch()));
        }

        if(movieFilterParameters.getCity() != null) {
            specifications.add(hasProjectionsInCity(movieFilterParameters.getCity()));
        }

        if(movieFilterParameters.getVenue() != null) {
            specifications.add(hasProjectionsInVenue(movieFilterParameters.getVenue()));
        }

        if(movieFilterParameters.getGenres() != null) {
            specifications.add(hasGenre(movieFilterParameters.getGenres()));
        }

        if(movieFilterParameters.getTime() != null) {
            specifications.add(hasProjectionOnTime(movieFilterParameters.getTime()));
        }

        if(movieFilterParameters.getDate() != null) {
            specifications.add(hasProjectionOnDate(movieFilterParameters.getDate()));
        }

        if(movieFilterParameters.getStartDate() != null && movieFilterParameters.getEndDate() != null) {
            specifications.add(movieIsBetweenDates(movieFilterParameters.getStartDate(), movieFilterParameters.getEndDate()));
        }

        return movieRepository.findAll(
                Specification.allOf(specifications),
                pageable
        );
    }
}
