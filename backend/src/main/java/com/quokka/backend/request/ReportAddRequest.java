package com.quokka.backend.request;

import lombok.Data;

import java.util.Date;

/**
 * Request to add a notification
 */
@Data
public class ReportAddRequest {

    private Long id;

    private Date deadline;
    private Long studentId;
}
