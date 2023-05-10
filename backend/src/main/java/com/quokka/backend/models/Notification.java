package com.quokka.backend.models;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
//@Table
public class Notification{

    // @Transient is used to not save the field in the database
    // @SequenceGenerator // ???
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE) // some properties like strategy etc. can be added
    private Long id;
    private String title;
    private String content;
    private boolean isSeen;
    private Date date;

    public Notification() {
    }
    public Notification( String title, String content, boolean isSeen, Date date) {
        this.title = title;
        this.content = content;
        this.isSeen = isSeen;
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}