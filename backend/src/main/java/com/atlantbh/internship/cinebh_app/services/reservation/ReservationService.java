package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.Reservation;
import com.atlantbh.internship.cinebh_app.dtos.ReservationDTO;

public interface ReservationService {
    Reservation createReservation(ReservationDTO reservationDto);
}
