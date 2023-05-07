package com.quokka.backend.controller;

import com.quokka.backend.models.Report;
import com.quokka.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @PostMapping("/report")
    Report internshipReport(@RequestBody Report internshipReport){

        return reportRepository.save(internshipReport);
    }
}
