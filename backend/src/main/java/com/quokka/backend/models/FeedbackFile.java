package com.quokka.backend.models;

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
 * Class to represent the feedback file entity
 */
@Entity
@Table
@Getter
@Setter
public class FeedbackFile implements MultipartFile{

    //auto generates id's
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fileName;
    private String feedbackDescription;

    //Holds the file data as a byte array
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;

    //maps to the feedback with feedback_id
    @OneToOne
    @JoinColumn(name = "feedback_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    Feedback feedback;

    @Override
    public String getName() {
        return fileName;
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
    public long getSize(){

        return fileData.length;
    }

    @Override
    public byte[] getBytes() throws IOException{

        return fileData;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return null;
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {

    }
}
