package com.quokka.backend.repository;

import com.quokka.backend.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<UserProfile, Long> {

}