package com.quokka.backend.models;

import java.io.File;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Student extends User{

    private String courseCode;
    private String letterGrade;
    private String companyName;
    private File companyEvaluationForm;

    @OneToMany
    private List<Report> reports;

    @OneToMany
    private List<GradeForm> gradeFormList;
}