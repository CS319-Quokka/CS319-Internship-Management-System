package com.quokka.backend.request;

import lombok.Data;

/**
 * Request to add an administrative assistant
 */
@Data
public class StudentAddRequest {
    private String companyName;
    private String courseCode;

    private Long accountId;
    private Long instructorId;
    private Long teachingAssistantId;
}
