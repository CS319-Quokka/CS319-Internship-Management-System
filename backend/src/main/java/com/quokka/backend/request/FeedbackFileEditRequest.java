package com.quokka.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FeedbackFileEditRequest{

    private MultipartFile fileData;
    private String feedbackDescription;
    private Long feedbackId;
}
