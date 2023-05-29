package com.quokka.backend.repository;

import com.quokka.backend.models.ReportFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository to handle the report file entity
 */
@Repository
public interface ReportFileRepository extends JpaRepository<ReportFile, Long>{
    ReportFile findByReportId(Long reportId);
}