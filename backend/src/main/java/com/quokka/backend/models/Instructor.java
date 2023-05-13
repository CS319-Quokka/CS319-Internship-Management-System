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
public class Instructor extends User {

    /*
    @OneToMany
    @JoinColumn(name = "instructor_id")
    private List<Student> students;
     */

    private File signature;
}