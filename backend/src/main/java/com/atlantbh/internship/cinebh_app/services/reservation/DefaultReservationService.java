package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.Reservation;
import com.atlantbh.internship.cinebh_app.domain.User;
import com.atlantbh.internship.cinebh_app.dtos.TicketRequest;
import com.atlantbh.internship.cinebh_app.repositories.ReservationRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import org.springframework.stereotype.Service;

@Service
public class DefaultReservationService implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final DefaultUserService userService;

    public DefaultReservationService(ReservationRepository reservationRepository, DefaultUserService userService) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
    }

    @Override
    public Reservation createTicket(TicketRequest ticketRequest) {
        User user = userService.loadUserByUsername(ticketRequest.userEmail());


        return null;
    }
}
