package com.atlantbh.internship.cinebh_app.domain;

import com.atlantbh.internship.cinebh_app.dtos.MovieRequest;
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
    @Column(length = 1024)
    private String trailer;
    private String tmdbId;
    @Column(length = 1024)
    private String synopsis;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MovieStatus status;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovieGenre> genres;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovieImage> images;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Projection> projections;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Personnel> personnel;

    public Movie(MovieRequest movieRequest) {
        this.name = movieRequest.name();
        this.pgRating = movieRequest.pgRating();
        this.language = movieRequest.language();
        this.duration = movieRequest.duration();
        this.startDate = movieRequest.startDate();
        this.endDate = movieRequest.endDate();
        this.trailer = movieRequest.trailer();
        this.tmdbId = movieRequest.tmdbId();
        this.synopsis = movieRequest.synopsis();
        this.status = movieRequest.status();
    }
}
