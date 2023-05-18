package com.quokka.backend.controller;

import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin
public class ReportController {

    private ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService){
        this.reportService = reportService;
    }

    @GetMapping("/{id}")
    public Report getReportWithID(@PathVariable("id") Long id){
        return reportService.getReportWithID(id);
    }

    @GetMapping
    public List<Report> getAllReports(){
        return reportService.getAllReports();
    }

    @GetMapping("/{studentID}")
    public String checkReportStatus(@PathVariable Long studentID){
        return reportService.checkReportStatus(studentID);
    }

    @PostMapping
    public boolean addReport(@RequestParam("studentID") Long studentID, @RequestParam("reportFile") ReportFile reportFile, @RequestParam("reportDescription") String reportDescription) {

        if(!reportFile.isEmpty()){

            System.out.println("Report added!");
            return reportService.addReport(studentID, reportFile, reportDescription);
        }

        System.out.println("Report not added!");
        return false;
    }

    @DeleteMapping("/{id}")
    public boolean removeReport(@PathVariable("id") Long reportID, @RequestParam("date") Date date){
        return reportService.removeReport(reportID,date);
    }

    @PatchMapping("/{reportID}")
    public boolean editReport(@PathVariable("reportID") Long reportID, @RequestParam("date")
    Date date, @RequestBody Report newReport){

        return reportService.editReport(reportID, date, newReport);
    }
}
