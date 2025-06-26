package com.atlantbh.internship.cinebh_app.dtos;

import com.atlantbh.internship.cinebh_app.domain.PersonnelRole;

public record PersonnelRequest(String name, String actorRoleName, PersonnelRole role) {
}
