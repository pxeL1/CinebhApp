package com.atlantbh.internship.CinebhApp.domain;

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
    private String director;
    private String synopsis;
    private MovieStatus status;
    @OneToMany
    @JsonIgnore
    private List<MovieGenre> genres;
    @OneToMany
    @JsonIgnore
    private List<MovieImage> images;
}
