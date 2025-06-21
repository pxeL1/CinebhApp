package com.atlantbh.internship.cinebh_app.repositories;

import com.atlantbh.internship.cinebh_app.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
