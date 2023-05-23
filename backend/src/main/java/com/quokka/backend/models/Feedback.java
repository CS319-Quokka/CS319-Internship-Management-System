package com.quokka.backend.models;

import java.util.Date;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue
    private Long id;

    private String feedbackDescription;
    private Date uploadDate;

    @OneToOne
    @JoinColumn(name = "report_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Report report;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
}