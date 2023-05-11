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


    private String name;
    private String email;

    @Id
    @GeneratedValue
    private long id;

    private String department;
    private String password;

    private String role;




    //private int activeProfileIndex = 0; //set the active profile here


    /* THIS IS FOR GETTING THE ROLE FROM THE ACTIVE PROFILE PAGE, COULD NOT FIGURE OUT HOW TO DO IT
    public String getRole(){
        return profiles.get(activeProfileIndex).getRole();
    }

     */
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}