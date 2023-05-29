package com.quokka.backend.repository;

import com.quokka.backend.models.AdministrativeAssistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository to handle the administrative assistant entity
 */
@Repository
public interface AdministrativeAssistantRepository extends JpaRepository<AdministrativeAssistant, Long> {
    List<AdministrativeAssistant> findByUserAccountId(Long userAccountId);
}
