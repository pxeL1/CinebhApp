package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.*;
import com.atlantbh.internship.cinebh_app.dtos.ReservationDTO;
import com.atlantbh.internship.cinebh_app.repositories.ProjectionRepository;
import com.atlantbh.internship.cinebh_app.repositories.ReservationRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class DefaultReservationService implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final DefaultUserService userService;
    private final ProjectionRepository projectionRepository;

    public DefaultReservationService(ReservationRepository reservationRepository, DefaultUserService userService, ProjectionRepository projectionRepository) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
        this.projectionRepository = projectionRepository;
    }

    @Override
    public Reservation createReservation(ReservationDTO reservationDto) {
        User user = userService.loadUserByUsername(reservationDto.username());
        Projection projection = projectionRepository.findById(reservationDto.reservationRequest().projection_id()).orElseThrow();

        Reservation reservation = new Reservation(reservationDto.reservationRequest().price(),
                reservationDto.reservationRequest().date(),
                user,
                projection);

        Payment payment = new Payment(Instant.now(), user, reservation);
        List<ReservedSeat> reservedSeats = new ArrayList<>();

        reservationDto.reservationRequest().seats().forEach(seat -> {
            reservedSeats.add(new ReservedSeat(reservation, seat));
        });

        reservation.setSeats(reservedSeats);
        reservation.setPayment(payment);

        return reservationRepository.save(reservation);
    }
}
