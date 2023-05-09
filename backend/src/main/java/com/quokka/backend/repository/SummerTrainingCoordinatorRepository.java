package com.quokka.backend.repository;

import com.quokka.backend.models.SummerTrainingCoordinator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummerTrainingCoordinatorRepository extends JpaRepository<SummerTrainingCoordinator, Long> {
}
