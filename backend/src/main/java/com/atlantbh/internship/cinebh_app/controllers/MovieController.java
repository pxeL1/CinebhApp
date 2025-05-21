package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.domain.MovieFilterParameters;
import com.atlantbh.internship.cinebh_app.dtos.Error;
import com.atlantbh.internship.cinebh_app.services.movie.MovieService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/movie")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(value = "/current")
    public ResponseEntity getCurrentMovies(Pageable pageable) {
        return ResponseEntity.ok(movieService.getAllCurrentMovies(pageable));
    }

    @GetMapping(value = "/upcoming")
    public ResponseEntity getUpcomingMovies(Pageable pageable) {
        return ResponseEntity.ok(movieService.getAllUpcomingMovies(pageable));
    }

    @GetMapping(value = "/filter")
    public ResponseEntity getFilteredMovies(Pageable pageable, MovieFilterParameters movieFilterParameters) {
        return ResponseEntity.ok(movieService.getFilteredMovies(pageable, movieFilterParameters));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getMovie(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(movieService.getMovie(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new Error(e.getMessage()));
        }
    }
}
