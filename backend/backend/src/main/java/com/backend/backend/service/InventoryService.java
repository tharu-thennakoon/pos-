package com.backend.backend.service;

import com.backend.backend.model.Product;
import com.backend.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getLowStockProducts() {
        return productRepository.findAll().stream()
                .filter(p -> p.getStockQuantity() <= p.getLowStockThreshold())
                .toList();
    }

    public Product updateStock(Long id, int quantity, String type) {
        Product product = productRepository.findById(id).orElseThrow();
        if ("INWARD".equals(type)) {
            product.setStockQuantity(product.getStockQuantity() + quantity);
        } else if ("DAMAGED".equals(type)) {
            product.setStockQuantity(product.getStockQuantity() - quantity);
        }
        return productRepository.save(product);
    }
}