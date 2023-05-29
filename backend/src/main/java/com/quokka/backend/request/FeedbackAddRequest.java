package com.quokka.backend.request;

import lombok.Data;
import java.util.Date;

/**
 * Request to add a feedback
 */
@Data
public class FeedbackAddRequest {

    private Long id;

    private Long studentId;
    private Long senderId;
    private Long reportId;
    private String feedbackDescription;
    private Date uploadDate;
}
