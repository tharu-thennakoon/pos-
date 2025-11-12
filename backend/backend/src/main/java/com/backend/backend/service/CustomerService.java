package com.backend.backend.service;

import com.backend.backend.model.Customer;
import com.backend.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer addLoyaltyPoints(Long id, int points) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setLoyaltyPoints(customer.getLoyaltyPoints() + points);
        return customerRepository.save(customer);
    }
}