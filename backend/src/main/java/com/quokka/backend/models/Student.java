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
public class Student extends User{

    private String courseCode;
    private String letterGrade;
    private String companyName;

    @ManyToOne
    @JoinColumn(name = "instructor")
    private Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "teaching_assistant")
    private TeachingAssistant teachingAssistant;

    private File companyEvaluationForm;
    private boolean isCompanyEvaluationFormArrived;

    @OneToMany
    @JoinColumn(name = "student_id")
    private List<Report> reports;

    @OneToOne
    @JoinColumn(name = "grade_form")
    private GradeForm gradeForm;
}