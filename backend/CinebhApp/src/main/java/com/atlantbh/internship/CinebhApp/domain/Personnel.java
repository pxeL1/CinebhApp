package com.atlantbh.internship.CinebhApp.domain;

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
    private String name;
    private String actorRoleName;
    private PersonnelRole role;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
