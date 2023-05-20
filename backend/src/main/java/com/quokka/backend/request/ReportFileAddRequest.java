package com.quokka.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ReportFileAddRequest {

    private Long id;

   // private Long reportId;
    private Long senderId;
    private String fileName;
    private MultipartFile fileData;
}
