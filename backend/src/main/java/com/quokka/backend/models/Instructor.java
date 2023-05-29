package com.quokka.backend.models;

import java.io.File;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the instructor entity
 */
@Entity
@Table
@Getter
@Setter
public class Instructor extends User {

    private File signature;
}