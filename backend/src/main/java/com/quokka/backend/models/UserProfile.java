package com.quokka.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserProfile {

   private String email;
   private String department;
   private String name;

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
