package com.quokka.backend.request;

import lombok.Data;

@Data
public class StudentEditRequest {
    
    private String letterGrade;
    private String companyName;
    private String courseCode;

    private Long instructorId;
    private Long teachingAssistantId;
}
