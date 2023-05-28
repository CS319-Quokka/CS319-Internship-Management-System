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
public class CompanyFormResponse {

    byte[] fileData;
    private String fileName;

}
