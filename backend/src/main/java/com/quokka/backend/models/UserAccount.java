package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table
@Getter
@Setter
public class UserAccount{


    @OneToMany
    @JoinColumn(name = "users_id")
    private List<User> users;

    @OneToMany
    @JoinColumn(name = "account_id")
    private List<UserProfile> profiles;


    private String role;

    private String name;
    private String email;

    @Id
    @GeneratedValue
    private long id;

    private String department;
    private String password;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}