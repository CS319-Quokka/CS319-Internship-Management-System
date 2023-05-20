package com.quokka.backend.request;

import lombok.Data;

@Data
public class StudentAddRequest {

    private Long id; // I think we can delete this. We don't use it.

    private String letterGrade;
    private String companyName;
    private String courseCode;

    private Long accountId;
    private Long instructorId;
    private Long teachingAssistantId;
}
