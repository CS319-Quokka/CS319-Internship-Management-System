package com.quokka.backend.repository;

import com.quokka.backend.models.CompanyForm;
import com.quokka.backend.models.ReportFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyFormRepository extends JpaRepository<CompanyForm, Long> {

    CompanyForm findByStudentId(Long studentId);
}
