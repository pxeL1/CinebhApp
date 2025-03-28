package com.atlantbh.internship.cinebh_app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String pgRating;
    private String language;
    private String duration;
    private Instant startDate;
    private Instant endDate;
    private String trailer;
    private String synopsis;
    @Column(nullable = false)
    private MovieStatus status;
    @OneToMany
    private List<MovieGenre> genres;
    @OneToMany
    private List<MovieImage> images;
}
