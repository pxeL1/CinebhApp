package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.Reservation;
import com.atlantbh.internship.cinebh_app.dtos.ReservationRequest;

public interface ReservationService {
    Reservation createReservation(ReservationRequest reservationRequest);
    void deleteReservation(Long id);
}
