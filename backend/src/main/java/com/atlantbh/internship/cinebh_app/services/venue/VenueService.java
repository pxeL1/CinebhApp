package com.atlantbh.internship.cinebh_app.services.venue;

import com.atlantbh.internship.cinebh_app.domain.Venue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VenueService {
    Page<Venue> getAllVenuesPage(Pageable pageable);
    List<Venue> getAllVenues();
}
