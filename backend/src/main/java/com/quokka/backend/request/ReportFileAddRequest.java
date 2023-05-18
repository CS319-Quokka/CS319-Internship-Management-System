package com.quokka.backend.request;

import lombok.Data;

@Data
public class ReportFileAddRequest {

    private Long id;

    private Long reportId;
    private String fileName;
    private byte [] fileData;
}
