package com.quokka.backend.repository;

import com.quokka.backend.models.ReportFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportFileRepository extends JpaRepository<ReportFile, Long> {

    Optional<ReportFile> findByReportId(Long reportId);
}