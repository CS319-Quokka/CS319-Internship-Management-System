package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
public class UserAccount{


    @OneToMany
    private List<UserProfile> profileList;
    private String name;
    private String email;
    @Id
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