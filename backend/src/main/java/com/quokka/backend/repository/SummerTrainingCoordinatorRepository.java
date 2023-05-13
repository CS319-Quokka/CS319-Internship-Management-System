package com.quokka.backend.repository;

import com.quokka.backend.models.SummerTrainingCoordinator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SummerTrainingCoordinatorRepository extends JpaRepository<SummerTrainingCoordinator, Long> {
    List<SummerTrainingCoordinator> findByUserAccountId(Long userAccountId);
}
