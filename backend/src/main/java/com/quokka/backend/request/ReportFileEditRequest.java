package com.quokka.backend.request;

import lombok.Data;

@Data
public class ReportFileEditRequest {

    private Long reportId;
    private String fileName;
    private byte[] fileData;
}
