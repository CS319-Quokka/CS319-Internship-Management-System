package com.quokka.backend.repository;

import com.quokka.backend.models.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report,Long> {
}