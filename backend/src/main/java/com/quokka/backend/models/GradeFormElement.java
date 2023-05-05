package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}