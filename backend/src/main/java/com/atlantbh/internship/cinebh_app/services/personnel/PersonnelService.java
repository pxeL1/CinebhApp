package com.atlantbh.internship.cinebh_app.services.personnel;

import com.atlantbh.internship.cinebh_app.domain.Personnel;

import java.util.List;

public interface PersonnelService {
    List<Personnel> getPersonnelByMovie(Long movieId);
}
