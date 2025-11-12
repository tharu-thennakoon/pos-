package com.backend.backend.controller;

import com.backend.backend.model.Product;
import com.backend.backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> getLowStock() {
        return ResponseEntity.ok(inventoryService.getLowStockProducts());
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<Product> updateStock(@PathVariable Long id, @RequestParam int quantity, @RequestParam String type) {
        return ResponseEntity.ok(inventoryService.updateStock(id, quantity, type));
    }
}