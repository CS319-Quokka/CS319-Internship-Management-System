package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the company entity
 */
@Entity
@Table
@Getter
@Setter
public class Company {
    private String name;

    //maps to the company with company_id
    @OneToMany
    @JoinColumn(name = "company_id")
    private List<Student> studentList;

    @Id
    @GeneratedValue
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}