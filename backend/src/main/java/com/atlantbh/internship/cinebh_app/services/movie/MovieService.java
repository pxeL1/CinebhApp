package com.atlantbh.internship.cinebh_app.services.movie;

import com.atlantbh.internship.cinebh_app.domain.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MovieService {
    Page<Movie> getAllCurrentMovies(Pageable pageable);
    Page<Movie> getAllUpcomingMovies(Pageable pageable);
}
