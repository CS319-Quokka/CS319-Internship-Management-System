package com.quokka.backend.repository;

import com.quokka.backend.models.CompanyForm;
import com.quokka.backend.models.ReportFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyFormRepository extends JpaRepository<CompanyForm, Long> {

    Optional<CompanyForm> findByStudentId(Long studentId);
}
