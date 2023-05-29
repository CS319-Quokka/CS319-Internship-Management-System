package com.quokka.backend.repository;

import com.quokka.backend.models.TeachingAssistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository to handle the teaching assistant entity
 */
@Repository
public interface TeachingAssistantRepository extends JpaRepository<TeachingAssistant, Long> {
    List<TeachingAssistant> findByUserAccountId(Long userAccountId);
}
