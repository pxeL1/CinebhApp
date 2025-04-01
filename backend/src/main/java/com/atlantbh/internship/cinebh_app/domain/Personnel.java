package com.atlantbh.internship.cinebh_app.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String actorRoleName;
    @Column(nullable = false)
    private PersonnelRole role;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
