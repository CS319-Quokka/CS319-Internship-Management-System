package com.quokka.backend.request;

import com.quokka.backend.models.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Data
public class AnnouncementAddRequest {

    private String title;
    private String content;
    private Date date;
}
