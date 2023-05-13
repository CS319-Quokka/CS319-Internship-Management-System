package com.quokka.backend.request;

import lombok.Data;

@Data
public class InstructorAddRequest {
    private Long id;
    private String firstName;
    private String lastName;
    private Long accountId;
    //ToDo: signature
}
