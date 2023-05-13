package com.quokka.backend.request;

import lombok.Data;

@Data
public class AdministrativeAssistantAddRequest {
    private Long id;
    private String firstName;
    private String lastName;
    private Long accountId;
}
