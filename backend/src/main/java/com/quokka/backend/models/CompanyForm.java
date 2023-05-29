package com.quokka.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * Class to represent the company form entity
 */
@Entity
@Table
@Getter
@Setter
public class CompanyForm implements MultipartFile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //Holds the form data as a byte array
    @Lob
    @JsonBackReference
    @Column(columnDefinition = "LONGBLOB")
    private byte[] formData;

    //maps to the student with student_id
    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    Student student;


    private String formName;

    @Override
    public String getName() {
        return formName;
    }

    @Override
    public String getOriginalFilename() {
        return null;
    }

    @Override
    public String getContentType() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public long getSize() {
        return formData.length;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return formData;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return null;
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {

    }
}
