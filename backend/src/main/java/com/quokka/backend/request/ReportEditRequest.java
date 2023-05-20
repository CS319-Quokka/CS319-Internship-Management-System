package com.quokka.backend.request;

import lombok.Data;

import java.util.Date;

@Data
public class ReportEditRequest {

    private Date deadline;
    private Long studentId;
}
