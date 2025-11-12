package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "reports")
@Data
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double revenue;
    private double profit;
    private double tax;
    // Add more fields as needed
}