package com.quokka.backend.Auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the response of the feedback file functionality
 */
@Data
@Getter
@Setter
public class FeedbackFileResponse {

    byte[] fileData;
    private Long feedbackId;
    private String feedbackDescription;

    private String fileName;
}
