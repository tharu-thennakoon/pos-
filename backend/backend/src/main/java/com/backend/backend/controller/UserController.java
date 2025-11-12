package com.backend.backend.controller;

import com.backend.backend.model.User;
import com.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody @Validated User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException ex) {
            // Custom validation errors (e.g., invalid email/role)
            Map<String, String> error = new HashMap<>();
            error.put("error", ex.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (DataIntegrityViolationException ex) {
            // Database constraint (e.g., duplicate email)
            Map<String, String> error = new HashMap<>();
            error.put("error", "Email already exists. Please use a different email.");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception ex) {
            // General errors
            Map<String, String> error = new HashMap<>();
            error.put("error", "User creation failed: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
}