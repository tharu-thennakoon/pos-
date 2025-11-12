package com.backend.backend.controller;

import com.backend.backend.model.Invoice;
import com.backend.backend.model.User;
import com.backend.backend.service.InvoiceService;
import com.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User cashier = null;
        if (auth != null) {
            cashier = userService.findByEmail(auth.getName());
        }
        return ResponseEntity.ok(invoiceService.createInvoice(invoice, cashier));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<Invoice> refund(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.refundInvoice(id));
    }
}