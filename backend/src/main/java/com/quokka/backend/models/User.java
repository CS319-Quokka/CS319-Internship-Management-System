package com.quokka.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.lang.module.FindException;
import java.util.List;

/**
 * Class to represent the user entity which will provide the common attributes for all users (inheritance)
 */
@Entity
@Table
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
public class User {

    //auto generates id's
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //maps to the user account with account_id
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    UserAccount userAccount;
    private String role;
}