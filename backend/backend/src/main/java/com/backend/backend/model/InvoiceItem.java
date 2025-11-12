package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "invoice_items")
@Data
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Invoice invoice;
    @ManyToOne
    private Product product;
    private int quantity;
    private double unitPrice;
    private double discount;
    private double lineTotal;
}