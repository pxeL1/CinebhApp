package com.atlantbh.internship.cinebh_app.services.seat;

import com.atlantbh.internship.cinebh_app.projections.ProjectionSeat;
import com.atlantbh.internship.cinebh_app.repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class DefaultSeatService implements SeatService {
    private final SeatRepository seatRepository;

    public DefaultSeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @Override
    public List<ProjectionSeat> getSeatsForProjection(long projectionId, Instant date) {
        return seatRepository.findAllSeatsByProjectionId(projectionId, date).stream().toList();
    }
}
