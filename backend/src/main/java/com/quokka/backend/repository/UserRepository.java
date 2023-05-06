package com.quokka.backend.repository;

import com.quokka.backend.models.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// deneme
@Repository
public interface UserRepository extends JpaRepository<UserAccount,Long> {

}
