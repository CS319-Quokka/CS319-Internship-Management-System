package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class SummerTrainingCoordinator extends UserProfile{

    @OneToMany
    private List<Announcement> madeAnnouncements;
}