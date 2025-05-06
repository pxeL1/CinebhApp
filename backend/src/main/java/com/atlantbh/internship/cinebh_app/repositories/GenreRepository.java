package com.atlantbh.internship.cinebh_app.repositories;

import com.atlantbh.internship.cinebh_app.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
