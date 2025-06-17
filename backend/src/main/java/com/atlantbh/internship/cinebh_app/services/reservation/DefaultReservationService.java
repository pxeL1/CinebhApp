package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.*;
import com.atlantbh.internship.cinebh_app.dtos.ReservationRequest;
import com.atlantbh.internship.cinebh_app.repositories.ProjectionRepository;
import com.atlantbh.internship.cinebh_app.repositories.ReservationRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class DefaultReservationService implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final DefaultUserService userService;
    private final ProjectionRepository projectionRepository;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public DefaultReservationService(ReservationRepository reservationRepository, DefaultUserService userService, ProjectionRepository projectionRepository) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
        this.projectionRepository = projectionRepository;
    }

    @Override
    public Reservation createReservation(ReservationRequest reservationRequest) {
        User user = userService.loadUserByUsername(reservationRequest.userEmail());
        Projection projection = projectionRepository.findById(reservationRequest.projectionId()).orElseThrow();

        Reservation reservation = new Reservation(getTotalPrice(reservationRequest.seats()), reservationRequest.date(), user, projection);

        List<ReservedSeat> seats = reservationRequest.seats().stream()
                .map(seat -> new ReservedSeat(reservation, seat))
                .toList();
        reservation.setSeats(seats);

        Reservation savedReservation = reservationRepository.save(reservation);

        scheduler.schedule(() -> {
            Reservation r = reservationRepository.findById(savedReservation.getId()).orElse(null);
            if (r != null && r.getPayment() == null) {
                reservationRepository.delete(r);
            }
        },
                20,
                TimeUnit.MINUTES);

        return savedReservation;
    }

    @Override
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    private double getTotalPrice(List<Seat> seats) {
        double totalPrice = 0;

        for (Seat seat : seats) {
            if(seat.getType() == SeatType.REGULAR) {
                totalPrice += 7;
            } else if (seat.getType() == SeatType.VIP) {
                totalPrice += 10;
            } else if (seat.getType() == SeatType.LOVE) {
                totalPrice += 24;
            }
        }

        return totalPrice;
    }
}
