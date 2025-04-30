package com.atlantbh.internship.cinebh_app.services.city;

import com.atlantbh.internship.cinebh_app.domain.City;
import com.atlantbh.internship.cinebh_app.repositories.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultCityService implements CityService {
    private final CityRepository cityRepository;

    public DefaultCityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
