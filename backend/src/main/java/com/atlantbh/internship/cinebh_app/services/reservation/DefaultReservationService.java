package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.*;
import com.atlantbh.internship.cinebh_app.dtos.TicketRequest;
import com.atlantbh.internship.cinebh_app.repositories.ProjectionRepository;
import com.atlantbh.internship.cinebh_app.repositories.ReservationRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import org.springframework.stereotype.Service;

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
    public Reservation createTicket(TicketRequest ticketRequest) {
        User user = userService.loadUserByUsername(ticketRequest.userEmail());
        Projection projection = projectionRepository.findById(ticketRequest.projectionId()).orElseThrow();

        Reservation reservation = new Reservation(ticketRequest.price(), ticketRequest.date(), user, projection);

        Payment payment = new Payment(ticketRequest.date(), ticketRequest.stripeSessionId(), user, reservation);
        reservation.setPayment(payment);

        List<ReservedSeat> seats = new ArrayList<>();
        ticketRequest.seats().forEach(seat -> {
            seats.add(new ReservedSeat(reservation, seat));
        });
        reservation.setSeats(seats);

        return reservationRepository.save(reservation);
    }
}
