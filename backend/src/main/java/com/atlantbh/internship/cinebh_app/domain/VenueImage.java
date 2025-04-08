package com.atlantbh.internship.cinebh_app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VenueImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String url;
    @OneToOne
    @JoinColumn(name = "venue_id")
    @JsonIgnore
    private Venue venue;
}
