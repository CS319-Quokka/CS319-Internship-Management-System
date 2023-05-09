package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table
@Getter
@Setter
public class AdministrativeAssistant extends Admin {

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrative_assistant_id")
    private List<Student> studentList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrative_assistant_id")
    private List<Instructor> instructorList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrative_assistant_id")
    private List<TeachingAssistant> teachingAssistantList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrative_assistant_id")
    private List<Company> companyList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrative_assistant_id")
    private List<Announcement> madeAnnouncementList;
}