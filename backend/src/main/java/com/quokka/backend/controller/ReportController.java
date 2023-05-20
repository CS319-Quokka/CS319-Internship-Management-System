package com.quokka.backend.controller;

import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
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
    public boolean addReport(@RequestParam("studentID") Long studentID, @RequestParam("reportFile") ReportFile reportFile, @RequestParam("reportDescription") String reportDescription) {

        System.out.println("geldi!");
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

    @PostMapping("/file")
    public ResponseEntity<String> addReportFile(@RequestBody ReportFileAddRequest request){

        System.out.println("coming");
        boolean result = reportService.addReportFile(request);

        System.out.println("back to life");
        if (result) {
            return ResponseEntity.ok("File uploaded successfully.");
        } else {
            System.out.println("FAILLIYO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }

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
