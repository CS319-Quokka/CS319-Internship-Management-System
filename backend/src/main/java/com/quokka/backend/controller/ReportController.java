package com.quokka.backend.controller;

import com.quokka.backend.models.Report;
import com.quokka.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Report getReportWithID(@PathVariable("id") long ID){
        return reportService.getReportWithID(ID);
    }

    @GetMapping
    public List<Report> getAllReports(){
        return reportService.getAllReports();
    }

    @GetMapping("/{studentID}")
    public String checkReportStatus(@PathVariable long studentID){
        return reportService.checkReportStatus(studentID);
    }

    @PostMapping
    public boolean addReport(@RequestParam("studentID") long studentID, @RequestParam("reportFile") File reportFile, @RequestParam("reportDescription") String reportDescription) {
        return reportService.addReport(studentID, reportFile, reportDescription);
    }


    @DeleteMapping("/{id}")
    public boolean removeReport(@PathVariable("id") long reportID, @RequestParam("date") Date date){
        return reportService.removeReport(reportID,date);
    }


    @PutMapping("/{reportID}")
    public boolean editReport(@PathVariable("reportID") long reportID, @RequestParam("date")
    Date date, @RequestBody Report newReport) {
        return reportService.editReport(reportID, date, newReport);
    }
}
