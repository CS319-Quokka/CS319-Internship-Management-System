package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
public class GradeFormElement {

    private String type;
    private String status;
    @ElementCollection
    private List<String> questions;
    @ElementCollection
    private List<String> answers;
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