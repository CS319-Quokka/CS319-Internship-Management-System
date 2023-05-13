package com.quokka.backend.request;

import lombok.Data;

@Data
public class StudentAddRequest {

    private Long id;
    private String firstName;
    private String lastName;


    private String letterGrade;
    private String companyName;
    private String courseCode;

    private Long accountId;
    private Long instructorId;
    private Long teachingAssistantId;
    //private Long companyEvaluationFormId;

    //private boolean isCompanyEvaluationFormArrived;
}
