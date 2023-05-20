package com.quokka.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ReportFileEditRequest {

    private Long reportId;
    private MultipartFile fileData;
}
