package com.atlantbh.internship.cinebh_app.services.venue;

import com.atlantbh.internship.cinebh_app.domain.Venue;
import com.atlantbh.internship.cinebh_app.repositories.VenueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultVenueService implements VenueService {
    private final VenueRepository venueRepository;

    public DefaultVenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    @Override
    public Page<Venue> getAllVenuesPage(Pageable pageable) {
        return venueRepository.findAll(pageable);
    }

    @Override
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }
}
