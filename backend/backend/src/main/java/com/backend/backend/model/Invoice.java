package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "invoices")
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dateTime = LocalDateTime.now();
    @ManyToOne
    private Customer customer;
    @OneToMany(cascade = CascadeType.ALL)
    private List<InvoiceItem> items;
    private double subtotal;
    private double discount;
    private double tax;
    private double total;
    @ManyToOne
    private User cashier;
    // Optional legacy single payment mode for backward compatibility
    private String paymentMode;

    // Support split payments
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;

    private String status = "PAID";
}