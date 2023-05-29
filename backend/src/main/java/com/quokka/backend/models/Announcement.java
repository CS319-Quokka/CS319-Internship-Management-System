package com.quokka.backend.models;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Class to represent the announcement entity
 */
@Entity
@Table
@Getter
@Setter
public class Announcement {
    //Generates id's automatically and sequently
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private Date date; // TODO
    private boolean isSeen; // I think no need

    //maps to the sender of announcement with senderId
    @ManyToOne // it was before @OneToOne
    @JoinColumn(name = "sender_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) //If you delete the user, you delete the announcements made by the user.
    private User sender;
    private String senderRole;
    private String audience;


}