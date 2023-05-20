package com.quokka.backend.repository;

import com.quokka.backend.models.ReportFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportFileRepository extends JpaRepository<ReportFile, Long> {

}