package com.quokka.backend.Auth;


import com.quokka.backend.models.Feedback;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReportFileResponse {

    byte[] fileData;
    private String reportDescription;
    private Long reportId;
    private String fileName;
    private Feedback feedback;
}
