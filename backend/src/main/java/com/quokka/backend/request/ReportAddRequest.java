package com.quokka.backend.request;

import lombok.Data;

import java.util.Date;

@Data
public class ReportAddRequest {

    private Long id;

    private Date deadline;
    private Long studentId;
    private String reportDescription;
}
