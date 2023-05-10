package com.quokka.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.io.File;

@Entity
@Table
@Getter
@Setter
public class UserProfile {

   private String email;
   private String department;
   private String name;
   private File profilePic;

   @Id
   @GeneratedValue
   private Long id;

   public void setId(Long id) {
      this.id = id;
   }

   public Long getId() {
      return id;
   }
}
