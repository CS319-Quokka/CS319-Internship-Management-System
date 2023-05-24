package com.quokka.backend.repository;

import com.quokka.backend.models.Report;
import com.quokka.backend.models.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {
    Optional<List<Report>> findReportsByStudentId(Long studentId);

}
