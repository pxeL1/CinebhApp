package com.atlantbh.internship.cinebh_app.services.movie;

import com.atlantbh.internship.cinebh_app.domain.*;
import com.atlantbh.internship.cinebh_app.dtos.MovieRequest;
import com.atlantbh.internship.cinebh_app.repositories.GenreRepository;
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
    private final GenreRepository genreRepository;

    public DefaultMovieService(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
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
        Movie movie = new Movie(movieRequest);
        List<Genre> genres = getGenresByNames(movieRequest.genres());

        List<MovieGenre> movieGenres = genres.stream()
                .map(genre -> new MovieGenre(movie, genre))
                .toList();
        movie.setGenres(movieGenres);

        List<MovieImage> images = movieRequest.images().stream()
                .map(image -> new MovieImage(image.url(), image.isCoverPhoto(), movie))
                .toList();
        movie.setImages(images);

        List<Projection> projections = movieRequest.projections().stream()
                .map(projection -> new Projection(projection.time(), movie, projection.hall()))
                .toList();
        movie.setProjections(projections);

        List<Personnel> personnel = movieRequest.personnel().stream()
                .map(person -> new Personnel(person.name(), person.actorRoleName(), person.role(), movie))
                .toList();
        movie.setPersonnel(personnel);

        return movieRepository.save(movie);
    }

    @Override
    public Movie updateMovie(Long id, MovieRequest movieRequest) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        List<Genre> genres = getGenresByNames(movieRequest.genres());

        movie.setName(movieRequest.name());
        movie.setPgRating(movieRequest.pgRating());
        movie.setLanguage(movieRequest.language());
        movie.setDuration(movieRequest.duration());
        movie.setStartDate(movieRequest.startDate());
        movie.setEndDate(movieRequest.endDate());
        movie.setTrailer(movieRequest.trailer());
        movie.setTmdbId(movieRequest.tmdbId());
        movie.setSynopsis(movieRequest.synopsis());
        movie.setStatus(movieRequest.status());

        movie.getGenres().clear();
        genres.stream()
                .map(genre -> new MovieGenre(movie, genre))
                .forEach(movie.getGenres()::add);

        movie.getImages().clear();
        movieRequest.images().stream()
                .map(image -> new MovieImage(image.url(), image.isCoverPhoto(), movie))
                .forEach(movie.getImages()::add);

        movie.getProjections().clear();
        movieRequest.projections().stream()
                .map(projection -> new Projection(projection.time(), movie, projection.hall()))
                .forEach(movie.getProjections()::add);

        movie.getPersonnel().clear();
        movieRequest.personnel().stream()
                .map(person -> new Personnel(person.name(), person.actorRoleName(), person.role(), movie))
                .forEach(movie.getPersonnel()::add);

        return movieRepository.save(movie);
    }

    private List<Genre> getGenresByNames(List<String> genreNames) {
        List<Genre> genres = genreRepository.findAll();

        return genres.stream().filter(genre -> genreNames.contains(genre.getName())).toList();
    }
}
