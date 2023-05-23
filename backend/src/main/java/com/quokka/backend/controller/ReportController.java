package com.quokka.backend.controller;

import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.request.*;
import com.quokka.backend.service.FeedbackService;
import com.quokka.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin
public class ReportController {

    private ReportService reportService;
    private FeedbackService feedbackService;

    @Autowired
    public ReportController(ReportService reportService, FeedbackService feedbackService){
        this.feedbackService = feedbackService;
        this.reportService = reportService;
    }

    @GetMapping("/{id}")
    public Report getReportWithID(@PathVariable Long id){
        return reportService.getReportWithID(id);
    }

    @GetMapping
    public List<Report> getAllReports(){
        return reportService.getAllReports();
    }

    @PostMapping
    public boolean addReport(@RequestBody ReportAddRequest request){

        if(!(request == null)){

            return reportService.addReport(request);
        }
        return false;
    }

    @GetMapping("/status/{studentID}")
    public String checkReportStatus(@PathVariable Long studentID){
        return reportService.checkReportStatus(studentID);
    }

    @GetMapping("/students_all_reports/{studentId}")
    public List<Report> getAllReportsByStudentId(@PathVariable Long studentId){

        return reportService.getAllReportsByStudentId(studentId);
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

        boolean reportFileSubmitted = reportService.addReportFile(request);
        if(reportFileSubmitted){

            FeedbackAddRequest feedbackRequest = new FeedbackAddRequest();
            feedbackRequest.setReportId(request.getReportId());
            feedbackRequest.setSenderId(request.getStudentId());
            feedbackRequest.setFeedbackDescription("");
            feedbackRequest.setUploadDate(null);
            feedbackService.addFeedback(feedbackRequest);
        }
        return reportFileSubmitted;
    }

    @GetMapping("/file/{id}")
    public ReportFile getReportFileByReportFileId(@PathVariable Long id){

        return reportService.getReportFileWithReportId(id);
    }

    @GetMapping("/file")
    public List<ReportFile> getAllReportFiles(){

        return reportService.getAllReportFiles();
    }

    @DeleteMapping
    public boolean removeAllReports(){

        return reportService.removeAllReports();
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
