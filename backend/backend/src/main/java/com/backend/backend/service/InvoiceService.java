package com.backend.backend.service;

import com.backend.backend.model.*;
import com.backend.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockHistoryRepository stockHistoryRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    public Invoice createInvoice(Invoice invoice, User cashier) {
        double subtotal = 0;
        for (InvoiceItem item : invoice.getItems()) {
            Product product = productRepository.findById(item.getProduct().getId()).orElseThrow();
            item.setUnitPrice(product.getUnitPrice());
            item.setLineTotal(item.getQuantity() * item.getUnitPrice() - item.getDiscount());
            subtotal += item.getLineTotal();
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);

            // Log stock outward
            StockHistory history = new StockHistory();
            history.setProduct(product);
            history.setType("OUTWARD");
            history.setQuantity(item.getQuantity());
            stockHistoryRepository.save(history);
        }
        invoice.setSubtotal(subtotal);
        invoice.setTotal(subtotal - invoice.getDiscount() + invoice.getTax());
        invoice.setCashier(cashier);

        // Persist invoice first to get ID for payments
        Invoice saved = invoiceRepository.save(invoice);

        // Handle payments: support split payments
        if (!CollectionUtils.isEmpty(saved.getPayments())) {
            double sum = saved.getPayments().stream().mapToDouble(Payment::getAmount).sum();
            if (Math.abs(sum - saved.getTotal()) > 0.01) {
                throw new IllegalArgumentException("Sum of payments must match invoice total.");
            }
            for (Payment payment : saved.getPayments()) {
                payment.setInvoice(saved);
                paymentRepository.save(payment);
            }
        } else if (saved.getPaymentMode() != null) {
            Payment payment = new Payment();
            payment.setInvoice(saved);
            payment.setMode(saved.getPaymentMode());
            payment.setAmount(saved.getTotal());
            paymentRepository.save(payment);
        }

        return saved;
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice refundInvoice(Long invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow();
        if ("REFUNDED".equalsIgnoreCase(invoice.getStatus())) {
            return invoice;
        }
        // Restock items
        for (InvoiceItem item : invoice.getItems()) {
            Product product = productRepository.findById(item.getProduct().getId()).orElseThrow();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);

            StockHistory history = new StockHistory();
            history.setProduct(product);
            history.setType("RETURN");
            history.setQuantity(item.getQuantity());
            stockHistoryRepository.save(history);
        }
        invoice.setStatus("REFUNDED");
        return invoiceRepository.save(invoice);
    }
}