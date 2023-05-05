package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;


@Entity

@Getter
@Setter
public class AdministrativeAssistant extends Admin {

    @OneToMany
    private List<Student> studentList;

    @OneToMany
    private List<Instructor> instructorList;

    @OneToMany
    private List<TeachingAssistant> teachingAssistantList;

    @OneToMany
    private List<Company> companyList;

    @OneToMany
    private List<Announcement> madeAnnouncementList;

}