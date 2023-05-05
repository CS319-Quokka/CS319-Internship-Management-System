package com.quokka.backend.models;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class SummerTrainingCoordinator extends UserProfile{

    private List<Announcement> madeAnnouncements;
}