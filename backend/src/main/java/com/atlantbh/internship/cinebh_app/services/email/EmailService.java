package com.atlantbh.internship.cinebh_app.services.email;


public interface EmailService {
    void sendEmail(String recipient, String subject, String body);
}
