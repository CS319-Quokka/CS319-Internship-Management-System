package com.quokka.backend.repository;

import com.quokka.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Long> {

}
