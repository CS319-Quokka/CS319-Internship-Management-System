package com.quokka.backend.repository;

import com.quokka.backend.models.FeedbackFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackFileRepository extends JpaRepository<FeedbackFile, Long>{
}
