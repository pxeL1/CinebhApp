package com.atlantbh.internship.cinebh_app.services.projection;

import com.atlantbh.internship.cinebh_app.domain.Projection;
import com.atlantbh.internship.cinebh_app.dtos.ProjectionDTO;
import com.atlantbh.internship.cinebh_app.repositories.ProjectionRepository;
import org.springframework.stereotype.Service;

@Service
public class DefaultProjectionService implements ProjectionService {
    private final ProjectionRepository projectionRepository;

    public DefaultProjectionService(ProjectionRepository projectionRepository) {
        this.projectionRepository = projectionRepository;
    }

    @Override
    public ProjectionDTO getProjection(Long id) {
        Projection projection = projectionRepository.findById(id).orElseThrow();
        return new ProjectionDTO(projection);
    }
}
