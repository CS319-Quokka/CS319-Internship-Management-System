package com.quokka.backend.models;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class GradeForm {

    @Id
    private Long id;

    @OneToOne
    private Student student;

    @OneToOne
    private Instructor instructor;

    private String courseCode;

    @OneToMany
    private List<GradeFormElement> elements;

    private String evaluationPhase;
    private String creationTime;
    private String overallEvaluation;

}