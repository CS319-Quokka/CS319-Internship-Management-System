package com.quokka.backend.models;

import java.util.Date;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Class to represent the feedback entity
 */
@Entity
@Table
@Getter
@Setter
public class Feedback {

    //auto generates id's
    @Id
    @GeneratedValue
    private Long id;

    private String feedbackDescription;
    private Date uploadDate;

    //maps to the report with report_id
    @OneToOne
    @JoinColumn(name = "report_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Report report;

    //maps to the sender of feedback with sender_id
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
}