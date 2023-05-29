package com.quokka.backend.repository;

import com.quokka.backend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository to handle the statistics entity
 */
@Repository
public interface StatisticsRepository extends JpaRepository<Student, Long> {
}
