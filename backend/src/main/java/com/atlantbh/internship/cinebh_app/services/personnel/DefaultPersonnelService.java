package com.atlantbh.internship.cinebh_app.services.personnel;

import com.atlantbh.internship.cinebh_app.domain.Personnel;
import com.atlantbh.internship.cinebh_app.repositories.PersonnelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultPersonnelService implements PersonnelService {
    private final PersonnelRepository personnelRepository;

    public DefaultPersonnelService(PersonnelRepository personnelRepository) {
        this.personnelRepository = personnelRepository;
    }

    @Override
    public List<Personnel> getPersonnelByMovie(Long movieId) {
        return personnelRepository.findAllByMovie_Id(movieId);
    }
}
