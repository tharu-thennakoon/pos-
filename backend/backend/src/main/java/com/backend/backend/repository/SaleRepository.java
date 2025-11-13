// src/main/java/com/backend/backend/repository/SaleRepository.java
package com.backend.backend.repository;

import com.backend.backend.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {}