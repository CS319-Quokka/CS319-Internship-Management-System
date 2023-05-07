package com.quokka.backend.repository;

import com.quokka.backend.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
}
