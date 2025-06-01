package com.atlantbh.internship.cinebh_app.services.seat;

import com.atlantbh.internship.cinebh_app.projections.ProjectionSeat;

import java.util.List;

public interface SeatService {
    List<ProjectionSeat> getSeatsForProjection(long projectionId);
}
