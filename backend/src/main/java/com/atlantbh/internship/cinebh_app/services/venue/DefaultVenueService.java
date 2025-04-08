package com.atlantbh.internship.cinebh_app.services.venue;

import com.atlantbh.internship.cinebh_app.domain.Venue;
import com.atlantbh.internship.cinebh_app.repositories.VenueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DefaultVenueService implements VenueService {
    private final VenueRepository venueRepository;

    public DefaultVenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    @Override
    public Page<Venue> getAllVenues(Pageable pageable) {
        return venueRepository.findAll(pageable);
    }
}
