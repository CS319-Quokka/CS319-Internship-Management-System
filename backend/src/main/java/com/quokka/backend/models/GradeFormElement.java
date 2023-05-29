package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the grade form element entity
 */
@Entity
@Getter
@Setter
public class GradeFormElement {

    private String type;
    private String status;

    //maps to the questions with questions_id
    @ElementCollection
    @JoinColumn(name = "questions_id")
    private List<String> questions;

    //maps to the answers with answers_id
    @ElementCollection
    @JoinColumn(name = "answers_id")
    private List<String> answers;

    //auto generates id's
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