package com.quokka.backend.models;

import java.io.File;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the student entity
 */
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

    //maps to the reports with report_id
    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    //maps to the grade form with grade_form_id
    @ManyToOne
    @JoinColumn(name = "teaching_assistant") // TODO: make this teaching_assistant_id
    private TeachingAssistant teachingAssistant;


}