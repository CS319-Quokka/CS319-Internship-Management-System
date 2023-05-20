package com.quokka.backend.models;

import java.io.File;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table
@Getter
@Setter
public class Feedback {

    @Column(name = "annotated_pdf_file")
    private File annotatedPDFfile;

    private String feedbackDescription;
    private Date date;

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "report_id")
    private Report report;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
}