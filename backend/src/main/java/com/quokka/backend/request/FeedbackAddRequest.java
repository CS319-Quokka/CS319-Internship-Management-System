package com.quokka.backend.request;

import lombok.Data;
import java.util.Date;

@Data
public class FeedbackAddRequest {

    private Long id;

    private Long senderId;
    private Long reportId;
    private String feedbackDescription;
    private Date uploadDate;
}
