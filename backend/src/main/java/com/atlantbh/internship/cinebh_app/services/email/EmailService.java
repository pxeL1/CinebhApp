package com.atlantbh.internship.cinebh_app.services.email;

import com.atlantbh.internship.cinebh_app.dtos.EmailResponse;

public interface EmailService {
    EmailResponse sendEmail(String recipient, String subject, String body);
}
