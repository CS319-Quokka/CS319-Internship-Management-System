package com.quokka.backend.request;

import lombok.Data;

@Data
public class TeachingAssistantAddRequest {
    private String firstName;
    private String lastName;
    private Long accountId;
}
