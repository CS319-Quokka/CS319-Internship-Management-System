package com.quokka.backend.repository;

import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.FeedbackFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository to handle the feedback file entity
 */
@Repository
public interface FeedbackFileRepository extends JpaRepository<FeedbackFile, Long>{

    Optional<FeedbackFile> findByFeedbackId(Long reportId);
}
