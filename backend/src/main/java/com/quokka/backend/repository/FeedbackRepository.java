package com.quokka.backend.repository;

import com.quokka.backend.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    Optional<Feedback> findByReportId(Long reportId);
}
