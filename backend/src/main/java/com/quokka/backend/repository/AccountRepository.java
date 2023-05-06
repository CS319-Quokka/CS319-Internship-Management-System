package com.quokka.backend.repository;

import com.quokka.backend.models.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<UserAccount, Long> {
}
