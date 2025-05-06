package com.atlantbh.internship.cinebh_app.services.genre;

import com.atlantbh.internship.cinebh_app.domain.Genre;
import com.atlantbh.internship.cinebh_app.repositories.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultGenreService implements GenreService {
    private final GenreRepository genreRepository;

    public DefaultGenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Override
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }
}
