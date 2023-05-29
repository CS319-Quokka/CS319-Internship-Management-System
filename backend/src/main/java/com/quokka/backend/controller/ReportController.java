package com.quokka.backend.controller;

import com.quokka.backend.Auth.AuthResponse;
import com.quokka.backend.Auth.CompanyFormResponse;
import com.quokka.backend.Auth.FeedbackFileResponse;
import com.quokka.backend.Auth.ReportFileResponse;
import com.quokka.backend.models.*;
import com.quokka.backend.request.*;
import com.quokka.backend.service.FeedbackService;
import com.quokka.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpHeaders;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

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

    @PostMapping("/company_form")
    public boolean addCompanyForm(CompanyFormAddRequest request){

        System.out.println("company 1");
        //se if the company form was correctly saved to the repository and return the response
        boolean success = reportService.addCompanyForm(request);

        if(success){
            return true;
        }

        return false;

    }

    @GetMapping("/get_company_form/{id}")
    public ResponseEntity<?> getCompanyFormById(@PathVariable("id") Long id){

        CompanyForm cef = reportService.getCompanyFormById(id);
        if (cef == null) {
            return ResponseEntity.ok("No cef available for this student");
        }

        CompanyFormResponse response = new CompanyFormResponse();
        response.setFileData(cef.getFormData());
        response.setFileName(cef.getFormName());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get_company_form_by_student/{studentId}")
    public ResponseEntity<?> getCompanyFormByStudentId(@PathVariable("studentId") Long studentId){

        CompanyForm cef = reportService.getCompanyFormByStudentId(studentId);
        if (cef == null) {
            return ResponseEntity.ok("No cef available for this student");
        }

        CompanyFormResponse response = new CompanyFormResponse();
        response.setFileData(cef.getFormData());
        response.setFileName(cef.getFormName());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/status/{studentID}")
    public String checkReportStatus(@PathVariable Long studentID){
        return reportService.checkReportStatus(studentID);
    }

    @GetMapping("/students_all_reports/{studentId}")
    public List<Report> getAllReportsByStudentId(@PathVariable("studentId") Long studentId){

        return reportService.getAllReportsByStudentId(studentId);
    }

    @GetMapping("/file/active/{studentId}")
    public ResponseEntity<?> getActiveReport(@PathVariable("studentId") Long studentId){

        Report report = reportService.getActiveReport(studentId);

        if(report == null){
            return ResponseEntity.ok("No submission open for this student");

        }
        ReportFile reportFile = reportService.getReportFileWithReportId(report.getId());

        ReportFileResponse response = new ReportFileResponse();

        if(reportFile == null){

            return ResponseEntity.ok("No active report file available for this student");
        }

        response.setReportDescription(reportFile.getReportDescription());
        response.setFileData(reportFile.getFileData());
        response.setFileName(reportFile.getFileName());
        response.setReportId(reportFile.getReport().getId());
        return ResponseEntity.ok(response);

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

        return reportFileSubmitted;
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<ReportFileResponse> getReportFileByReportFileId(@PathVariable Long id){

        ReportFileResponse response = new ReportFileResponse();

        ReportFile reportFile = reportService.getReportFileWithReportId(id);

        if (reportFile != null) {

            response.setReportDescription(reportFile.getReportDescription());
            response.setFileData(reportFile.getFileData());
            response.setFileName(reportFile.getFileName());
            response.setReportId(reportFile.getReport().getId());

            return ResponseEntity.ok(response);
        }
        else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

    }

    @GetMapping("/file")
    public Stream<ReportFile> getAllReportFiles(){

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
