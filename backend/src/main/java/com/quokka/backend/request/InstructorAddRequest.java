package com.quokka.backend.request;

import lombok.Data;

@Data
public class InstructorAddRequest {
    private Long id;
    private Long accountId;
    //ToDo: signature
}
