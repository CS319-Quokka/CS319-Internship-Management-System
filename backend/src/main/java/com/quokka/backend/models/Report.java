package com.quokka.backend.models;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table
@Getter
@Setter
public class Report {

    private String reportDescription;

    @OneToOne
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    private Date uploadDate;
    //deadline has been moved to student entity
    private Date deadline;
    private String status;

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Student student;
}