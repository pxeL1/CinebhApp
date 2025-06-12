package com.atlantbh.internship.cinebh_app.services.reservation;

import com.atlantbh.internship.cinebh_app.domain.Reservation;
import com.atlantbh.internship.cinebh_app.dtos.TicketRequest;

public interface ReservationService {
    Reservation createTicket(TicketRequest ticketRequest);
}
