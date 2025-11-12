package com.backend.backend.repository;

import com.backend.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
}