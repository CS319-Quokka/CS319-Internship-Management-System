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

@Entity
@Table
@Getter
@Setter
public class FeedbackFile implements MultipartFile{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fileName;
    private String feedbackDescription;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;

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
