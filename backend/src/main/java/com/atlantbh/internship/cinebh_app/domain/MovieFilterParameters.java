package com.atlantbh.internship.cinebh_app.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieFilterParameters {
    private String search;
    private String city;
    private String venue;
    private List<String> genres;
    private String fromTime;
    private String toTime;
    private String date;
    private String type;
    private String startDate;
    private String endDate;
}
