package com.backend.backend.controller;

import com.backend.backend.model.Product;
import com.backend.backend.model.Sale;
import com.backend.backend.repository.ProductRepository;
import com.backend.backend.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SaleRepository saleRepository;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {
        List<Product> products = productRepository.findAll();
        List<Sale> sales = saleRepository.findAll();

        // Calculate metrics
        double totalRevenue = sales.stream()
                .mapToDouble(sale -> sale.getTotalAmount())
                .sum();

        long totalSales = sales.size();

        long lowStockCount = products.stream()
                .filter(p -> p.getStockQuantity() <= p.getLowStockThreshold())
                .count();

        // Weekly sales (last 7 days)
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
        Map<String, Double> weeklySales = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate date = sevenDaysAgo.plusDays(i);
            String day = date.getDayOfWeek().name().substring(0, 3).toUpperCase();
            double dayRevenue = sales.stream()
                    .filter(s -> s.getSaleDate().toLocalDate().equals(date))
                    .mapToDouble(Sale::getTotalAmount)
                    .sum();
            weeklySales.put(day, dayRevenue);
        }

        DashboardResponse response = new DashboardResponse();
        response.setTotalRevenue(totalRevenue);
        response.setTotalSales(totalSales);
        response.setLowStockCount(lowStockCount);
        response.setWeeklySales(weeklySales);

        return ResponseEntity.ok(response);
    }
}

// ──────────────────────────────────────────────────────────────
// DTO: DashboardResponse (matches frontend)
class DashboardResponse {
    private double totalRevenue;
    private long totalSales;
    private long lowStockCount;
    private Map<String, Double> weeklySales;

    // Getters and Setters
    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getTotalSales() { return totalSales; }
    public void setTotalSales(long totalSales) { this.totalSales = totalSales; }

    public long getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }

    public Map<String, Double> getWeeklySales() { return weeklySales; }
    public void setWeeklySales(Map<String, Double> weeklySales) { this.weeklySales = weeklySales; }
}