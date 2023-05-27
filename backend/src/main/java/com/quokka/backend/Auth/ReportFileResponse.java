package com.quokka.backend.Auth;


import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.FeedbackFile;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Data
@Getter
@Setter
public class ReportFileResponse {

    byte[] fileData;
    private String reportDescription;
    private Long reportId;
    private String fileName;
    private Instant uploadDate;

}
