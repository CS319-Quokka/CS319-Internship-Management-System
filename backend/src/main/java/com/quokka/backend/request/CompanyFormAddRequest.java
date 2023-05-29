package com.quokka.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

/**
 * Request to add a company form
 */
@Data
public class CompanyFormAddRequest {
    private Long id;

    private Long studentId;
    private MultipartFile fileData;

}
