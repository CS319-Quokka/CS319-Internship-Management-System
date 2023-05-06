package com.quokka.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;

    @OneToOne
    private UserProfile profile;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
