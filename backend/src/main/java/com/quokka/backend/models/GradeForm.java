package com.quokka.backend.models;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the grade form entity
 */
@Entity
@Table
@Getter
@Setter
public class GradeForm {

    //auto generates id's
    @Id
    @GeneratedValue
    private Long id;
    private Long studentId;//ToDo

    //maps to the instructor with instructor_id
    @OneToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    private String courseCode;

    //maps to the elements of the grade form with grade_form_id
    @OneToMany
    @JoinColumn(name = "grade_form_id")
    private List<GradeFormElement> elements;

    private String evaluationPhase;
    private String creationTime;
    private String overallEvaluation;
}
