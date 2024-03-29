package com.quokka.backend.repository;

import com.quokka.backend.models.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository to handle the authentication entity
 */
@Repository
public interface AuthenticationRepository extends JpaRepository<UserAccount,Long> {
}
