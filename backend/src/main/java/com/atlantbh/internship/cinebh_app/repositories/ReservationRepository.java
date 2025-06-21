package com.atlantbh.internship.cinebh_app.repositories;

import com.atlantbh.internship.cinebh_app.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
