package com.quokka.backend.repository;

import com.quokka.backend.models.TeachingAssistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeachingAssistantRepository extends JpaRepository<TeachingAssistant, Long> {
}
