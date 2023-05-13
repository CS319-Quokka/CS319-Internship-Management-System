package com.quokka.backend.models;

import java.io.File;
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

    private File reportFile;
    private String revisionDescription;

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

    //If you don't want to see the inside entities, fetch = FetchType.LAZY
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    //If you delete the student or user, you delete the reports
    @OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore //this is for the json to not show the inside entities(serialization )
    private Student student;

}