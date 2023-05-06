package com.quokka.backend.models;

import java.io.File;
import java.util.List;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Student extends UserProfile{

    private String courseCode;
    private String letterGrade;
    private String companyName;
    private File companyEvaluationForm;
    private List<Report> reports;
    private List<GradeForm> gradeFormList;
}