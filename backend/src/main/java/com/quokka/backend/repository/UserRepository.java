package com.quokka.backend.repository;

import com.quokka.backend.models.UserAccount;
import com.quokka.backend.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserProfile,Long> {

}
