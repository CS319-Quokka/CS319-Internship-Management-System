package com.quokka.backend.request;

import lombok.Data;

@Data
public class StudentAddRequest {
    private String companyName;
    private String courseCode;

    private Long accountId;
    private Long instructorId;
    private Long teachingAssistantId;
}
