package com.atlantbh.internship.cinebh_app.repositories;

import com.atlantbh.internship.cinebh_app.domain.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonnelRepository extends JpaRepository<Personnel, Long> {
    List<Personnel> findAllByMovie_Id(Long movieId);
}
