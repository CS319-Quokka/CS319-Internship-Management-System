package com.quokka.backend.models;

import java.time.Instant;
import java.util.Date;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Class to represent the report entity
 */
@Entity
@Table
@Getter
@Setter
public class Report {

    //auto generates id's
    @Id
    @GeneratedValue
    private Long id;

    private Instant uploadDate;
    private Date deadline;

    //maps to the grade form with grade_form_id
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Student student;
}