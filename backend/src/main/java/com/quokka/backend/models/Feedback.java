package com.quokka.backend.models;

import java.io.File;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
public class Feedback {
    @OneToOne
    private UserProfile sender;
    private File annotatedPDFfile;

    private String feedbackDescription;

    private Date date;
    @Id
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}