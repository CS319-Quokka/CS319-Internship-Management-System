package com.quokka.backend.models;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table
@Getter
@Setter
public class GradeForm {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    private String courseCode;

    @OneToMany
    @JoinColumn(name = "grade_form_id")
    private List<GradeFormElement> elements;

    private String evaluationPhase;
    private String creationTime;
    private String overallEvaluation;
}
