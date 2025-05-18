package com.atlantbh.internship.cinebh_app.controllers;

import com.atlantbh.internship.cinebh_app.services.personnel.PersonnelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/personnel")
public class PersonnelController {
    private final PersonnelService personnelService;

    public PersonnelController(PersonnelService personnelService) {
        this.personnelService = personnelService;
    }

    @GetMapping(value = "/movie/{id}")
    public ResponseEntity getPersonnelByMovie(@PathVariable Long id) {
        return ResponseEntity.ok(personnelService.getPersonnelByMovie(id));
    }
}
