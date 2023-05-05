package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter

public class TeachingAssistant extends UserProfile{

    private List<Student> students;
}