package com.quokka.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.lang.module.FindException;
import java.util.List;

@Entity
@Table
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //If you don't want to see the inside entities, fetch = FetchType.LAZY
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    //If you delete the account, you delete the users
    @OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore //this is for the json to not show the inside entities(serialization )
     UserAccount userAccount;

    private String firstName;
    private String lastName;
}
