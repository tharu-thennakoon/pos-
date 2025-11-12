package com.backend.backend.service;

import com.backend.backend.model.Invoice;
import com.backend.backend.model.Report;
import com.backend.backend.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public Report generateSalesReport(LocalDateTime start, LocalDateTime end) {
        List<Invoice> invoices = invoiceRepository.findByDateTimeBetween(start, end);
        double totalRevenue = invoices.stream().mapToDouble(Invoice::getTotal).sum();
        Report report = new Report();
        report.setRevenue(totalRevenue);
        // Add more calculations for profit, tax
        return report;
    }
}