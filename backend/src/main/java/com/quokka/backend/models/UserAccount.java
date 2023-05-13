package com.quokka.backend.models;

import java.io.File;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table
@Getter
@Setter
public class UserAccount{


    //Dilruba buraya onetomany yazmadı
    //@OneToMany
    //@JoinColumn(name = "users_id")
    //private List<User> users;

    //@OneToMany
    //@JoinColumn(name = "account_id")
    //private Long accountId;


    private String name;
    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // this strategy is for
    private Long id;

    private String department;
    private String password;




    //private int activeProfileIndex = 0; //set the active profile here


    /* THIS IS FOR GETTING THE ROLE FROM THE ACTIVE PROFILE PAGE, COULD NOT FIGURE OUT HOW TO DO IT
    public String getRole(){
        return profiles.get(activeProfileIndex).getRole();
    }

     */
    private File profilePic; // ToDo
}