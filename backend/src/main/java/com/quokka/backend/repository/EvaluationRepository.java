package com.quokka.backend.repository;

import com.quokka.backend.models.GradeForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvaluationRepository extends JpaRepository<GradeForm, Long> {
}
