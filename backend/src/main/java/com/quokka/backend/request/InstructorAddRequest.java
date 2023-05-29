package com.quokka.backend.request;

import lombok.Data;

/**
 * Request to add an instructor
 */
@Data
public class InstructorAddRequest {

    private Long accountId;
}
