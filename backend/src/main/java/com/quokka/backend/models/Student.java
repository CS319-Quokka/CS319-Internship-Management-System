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

    @ManyToOne
    private Instructor instructor;

    @ManyToOne
    private TeachingAssistant teachingAssistant;

    private File companyEvaluationForm;
    private boolean isCompanyEvaluationFormArrived;

    @OneToMany
    private List<Report> reports;

    @OneToOne
    private GradeForm gradeForm;
}