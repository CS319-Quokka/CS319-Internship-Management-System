package com.quokka.backend.models;

import java.util.Date;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue
    private Long id;

    private String feedbackDescription;
    private Date uploadDate;

    @OneToOne
    @JoinColumn(name = "report_id")
    private Report report;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
}