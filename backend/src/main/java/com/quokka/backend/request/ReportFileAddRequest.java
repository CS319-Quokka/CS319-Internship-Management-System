package com.quokka.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ReportFileAddRequest {

    private Long id;

    private String reportDescription;
    private Long studentId;
    private Long reportId;
    private MultipartFile fileData;
}
