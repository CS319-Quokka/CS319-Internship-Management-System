package com.quokka.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Date;

@Data
public class ReportFileAddRequest {

    private Long id;

    private String reportDescription;
    private Long studentId;
    private Long reportId;
    private Instant uploadDate;
    private MultipartFile fileData;
}
