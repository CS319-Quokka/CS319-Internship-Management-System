package com.quokka.backend.models;

import java.io.File;
import java.util.Date;
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
    private Date deadline;
    private String status;
    private Long activeReportId;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "teaching_assistant")
    private TeachingAssistant teachingAssistant;

    private File companyEvaluationForm; // ToDo: request değişecek
    //private boolean isCompanyEvaluationFormArrived;
}