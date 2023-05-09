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

    @OneToOne
    @JoinColumn(name = "sender_id")
    private UserProfile sender;

    @Column(name = "annotated_pdf_file")
    private File annotatedPDFfile;

    private String feedbackDescription;
    private Date date;

    @Id
    @GeneratedValue
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}