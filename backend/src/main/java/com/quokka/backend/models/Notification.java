package com.quokka.backend.models;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Getter
@Setter
@Table
public class Notification{

    //Generates id's automatically and sequently
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String title;
    private String content;
    private Date date; // TODO
    private boolean isSeen;

    //maps to the sender of announcement with senderId
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // TODO: DOES NOT WORK!
    private User user;

}