package com.quokka.backend.models;

import java.io.File;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
    private String status;
    @Id
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}