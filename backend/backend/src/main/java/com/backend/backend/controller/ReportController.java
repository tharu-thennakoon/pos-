package com.backend.backend.controller;

import com.backend.backend.model.Report;
import com.backend.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/sales")
    public ResponseEntity<Report> getSalesReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(reportService.generateSalesReport(start, end));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardMetrics() {
        Map<String, Object> response = new HashMap<>();
        response.put("metrics", Map.of(
                "totalRevenue", 30.69,
                "totalSales", 3,
                "productsSold", 6,
                "totalCustomers", 3
        ));
        response.put("weeklySales", List.of(
                Map.of("day", "Sun", "sales", 12),
                Map.of("day", "Mon", "sales", 16)
        ));
        response.put("topProducts", List.of(
                Map.of("name", "Laundry Detergent", "price", 12.99, "percentage", 40),
                Map.of("name", "Toast", "price", 5.99, "percentage", 26)
        ));
        return ResponseEntity.ok(response);
    }
}