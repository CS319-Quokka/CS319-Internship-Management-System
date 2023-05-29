package com.quokka.backend.models;

import java.io.File;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the user account entity
 */
@Entity
@Table
@Getter
@Setter
public class UserAccount{

    //generate id automatically
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String password;
    private File profilePic; // ToDo
}