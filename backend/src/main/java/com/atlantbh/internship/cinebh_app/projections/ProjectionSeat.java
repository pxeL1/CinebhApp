package com.atlantbh.internship.cinebh_app.projections;

import com.atlantbh.internship.cinebh_app.domain.SeatType;

public interface ProjectionSeat {
    Long getId();
    String getNumber();
    SeatType getType();
    boolean getReserved();
}
