package com.quokka.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the summer training coordinator entity
 */
@Entity
@Table
@Getter
@Setter
public class SummerTrainingCoordinator extends User{

}