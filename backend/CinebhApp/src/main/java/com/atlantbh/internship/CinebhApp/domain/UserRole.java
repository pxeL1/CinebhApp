package com.atlantbh.internship.CinebhApp.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "cinebh_user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
