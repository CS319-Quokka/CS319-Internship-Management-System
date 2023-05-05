package com.quokka.backend.models;

import java.io.File;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
public class Instructor extends UserProfile {

    private List<Student> students;
    private File signature;
}