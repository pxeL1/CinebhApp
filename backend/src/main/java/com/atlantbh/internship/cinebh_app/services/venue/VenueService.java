package com.atlantbh.internship.cinebh_app.services.venue;

import com.atlantbh.internship.cinebh_app.domain.Venue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VenueService {
    Page<Venue> getAllVenues(Pageable pageable);
}
