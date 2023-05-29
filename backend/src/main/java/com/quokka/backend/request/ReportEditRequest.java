package com.quokka.backend.request;

import lombok.Data;

import java.util.Date;

/**
 * Request to add a notification
 */
@Data
public class ReportEditRequest {

    private Date deadline;
    private Long studentId;
}
