package com.quokka.backend.models;

import java.io.File;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
public class Report {

    private File reportFile;
    private String revisionDescription;

    @OneToOne
    private Feedback feedback;

    private Date uploadDate;
    private Date deadline;
    private String status;
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