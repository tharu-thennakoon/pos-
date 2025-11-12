package com.backend.backend.controller;

import com.backend.backend.model.Customer;
import com.backend.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @PostMapping("/{id}/loyalty")
    public ResponseEntity<Customer> addPoints(@PathVariable Long id, @RequestParam int points) {
        return ResponseEntity.ok(customerService.addLoyaltyPoints(id, points));
    }
}