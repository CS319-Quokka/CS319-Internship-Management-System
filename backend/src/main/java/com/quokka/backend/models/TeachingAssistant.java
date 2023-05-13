package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table
@Getter
@Setter

public class TeachingAssistant extends User{

    /*
    @OneToMany
    @JoinColumn(name = "teaching_assistant_id")
    private List<Student> students;
     */
}