package com.quokka.backend.controller;

import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.request.ReportAddRequest;
import com.quokka.backend.request.ReportEditRequest;
import com.quokka.backend.request.ReportFileAddRequest;
import com.quokka.backend.request.ReportFileEditRequest;
import com.quokka.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public boolean addReport(@RequestBody ReportAddRequest request){

        if(!(request == null)){

            return reportService.addReport(request);
        }
        return false;
    }

    @DeleteMapping("/{id}")
    public boolean removeReport(@PathVariable("id") Long reportID, @RequestParam("date") Date date){
        return reportService.removeReport(reportID,date);
    }

    @PatchMapping("/{reportID}")
    public boolean editReport(@PathVariable("reportID") Long reportID, @RequestBody ReportEditRequest request){

        return reportService.editReport(reportID, request);
    }

    @PostMapping("/file")
    public boolean addReportFile(ReportFileAddRequest request){

        return reportService.addReportFile(request);
    }

    @GetMapping("/file/{id}")
    public ReportFile getReportFileByReportFileId(@PathVariable Long id){

        return reportService.getReportFileWithReportId(id);
    }

    @GetMapping("/file")
    public List<ReportFile> getAllReportFiles(){

        return reportService.getAllReportFiles();
    }

    @DeleteMapping("/file")
    public boolean removeAllReportFiles(){

        return reportService.removeAllReportFiles();
    }

    @DeleteMapping("/file/{id}")
    public boolean removeReportFileById(@PathVariable Long id){

        return reportService.removeReportFile(id);
    }

    @PatchMapping("/file/{id}")
    public boolean editReportFileById(@PathVariable Long id, ReportFileEditRequest request){

        return reportService.editReportFile(id, request);
    }
}
