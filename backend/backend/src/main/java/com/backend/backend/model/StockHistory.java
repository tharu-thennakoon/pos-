package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_history")
@Data
public class StockHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Product product;
    private String type; // INWARD, OUTWARD, DAMAGED
    private int quantity;
    private LocalDateTime dateTime = LocalDateTime.now();
}