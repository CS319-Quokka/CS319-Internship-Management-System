package com.quokka.backend.service;

import com.quokka.backend.controller.FeedbackController;
import com.quokka.backend.models.CompanyForm;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.models.Student;
import com.quokka.backend.repository.*;
import com.quokka.backend.request.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;
import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for report related operations
 */
@Service
public class ReportService {

    //
    private ReportRepository reportRepository;
    private ReportFileRepository reportFileRepository;
    private StudentRepository studentRepository;
    private FeedbackRepository feedbackRepository;

    private CompanyFormRepository companyFormRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository, ReportFileRepository reportFileRepository,
                         StudentRepository studentRepository, CompanyFormRepository companyFormRepository,
                         FeedbackRepository feedbackRepository) {

        this.feedbackRepository = feedbackRepository;
        this.reportFileRepository = reportFileRepository;
        this.reportRepository = reportRepository;
        this.studentRepository = studentRepository;
        this.companyFormRepository = companyFormRepository;
    }

    public Report getReportWithID(Long ID) {

        Optional<Report> report = reportRepository.findById(ID);
        if (!report.isPresent()) {

            return null;
        }
        return report.get();
    }

    public List<Report> getAllReports() {

        return reportRepository.findAll();
    }

    public String checkReportStatus(Long StudentID) {

        return studentRepository.findById(StudentID).get().getStatus();
    }

    public CompanyForm getCompanyFormById(Long id){

        Optional<CompanyForm> form = companyFormRepository.findById(id);

        if(!form.isPresent()){
            return null;
        }

        return form.get();
    }


    public CompanyForm getCompanyFormByStudentId(Long studentId){


        Optional<Student> student = studentRepository.findById(studentId);

        //there is no student with the given id
        if(!student.isPresent()){
            return null;
        }


        Optional<CompanyForm> form = companyFormRepository.findByStudentId(studentId);

        //there is no form for the given student
        if(!form.isPresent()){
            return null;
        }

        return form.get();


    }



    public boolean addCompanyForm(CompanyFormAddRequest request){

        //get the file and student id from the request
        MultipartFile file = request.getFileData();
        Long studentId = request.getStudentId();

        try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            String name = file.getOriginalFilename();

            // Get the user and update the profile picture path
            Optional<Student> student = studentRepository.findById(studentId);

            CompanyForm companyForm = new CompanyForm();
            if(!student.isPresent()){

                companyForm.setFormData(null);
                return false;
            }

            if(request.getFileData() == null){

                companyForm.setFormName(null);
                companyForm.setFormData(null);
                return false;
            }


            //save the company form to the repository
            else{
                companyForm.setFormData(bytes);
                companyForm.setFormName(name);
                companyForm.setStudent(student.get());
                companyFormRepository.save(companyForm);
                return true;
            }


        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }



    public boolean addReport(ReportAddRequest request) {

        List<Report> studentsReports = getAllReportsByStudentId(request.getStudentId());
        if(studentsReports.size() != 0){

            Long lastReportId = studentsReports.get(studentsReports.size() - 1).getId();
            if(getReportFileWithReportId(lastReportId) == null){

                return false;
            }
        }
        Report newInternshipReport = new Report();
        Optional<Student> student = studentRepository.findById(request.getStudentId());
        if (!student.isPresent()) {

            newInternshipReport.setStudent(null);
        } else {

            newInternshipReport.setStudent(student.get());
        }
        student.get().setStatus("Waiting to upload report");
        student.get().setActiveReportId(newInternshipReport.getId());
        newInternshipReport.setId(request.getId());
        newInternshipReport.setDeadline(request.getDeadline());
        reportRepository.save(newInternshipReport);
        return true;
    }

    public List<Report> getAllReportsByStudentId(Long studentId) {

        Optional<List<Report>> reports = reportRepository.findByStudentId(studentId);

        if(!reports.isPresent()){
            return null;
        }


        return reports.get();
    }

    public boolean removeAllReports() {

        reportRepository.deleteAll();
        return true;
    }

    public boolean reportExceptionCheck(Long reportID, Date date) {

        if (!reportRepository.existsById(reportID)) {

            return false;
        }

        if (getReportWithID(reportID).getDeadline().after(date)) {

            return false;
        }
        return true;
    }

    public boolean removeReport(Long reportID, Date date) {

        if (reportExceptionCheck(reportID, date)) {

            reportRepository.deleteById(reportID);
            return true;
        }
        return false;
    }

    public boolean editReport(Long reportID, ReportEditRequest request) {

        if (reportExceptionCheck(reportID, request.getDeadline())) {

            Optional<Report> reportOpt = reportRepository.findById(reportID);
            if (!reportOpt.isPresent()) {

                return false;
            }

            removeReport(reportID, request.getDeadline());
            Report editedReport = new Report();
            editedReport.setStudent(studentRepository.findById(request.getStudentId()).get());
            editedReport.setDeadline(request.getDeadline());
            reportRepository.save(editedReport);
            return true;
        }
        return false;
    }

    public ReportFile getReportFileWithReportId(Long id) {

        ReportFile reportFile = reportFileRepository.findByReportId(id);

        if (reportFile != null) {
            return reportFile;
        } else {
            return null;
        }
    }


    public Report getActiveReport(Long studentId) {


        Optional<List<Report>> reports = reportRepository.findByStudentId(studentId);


        if(reports.get().size() == 0){
            return null;
        }

        if(reports.get().size() == 1){
            return reports.get().get(0);
        }

        int lastIndex = reports.get().size()-1;
        return reports.get().get(lastIndex);
    }



    public Stream<ReportFile> getAllReportFiles() {

        return reportFileRepository.findAll().stream();
    }

    public boolean addReportFile(ReportFileAddRequest request){

        if (request == null) {


            return false;
        }

        try {

            ReportFile reportFile = new ReportFile();
            Optional<Report> reportOpt = reportRepository.findById(request.getReportId());
            if(!reportOpt.isPresent()){

                reportFile.setReport(null);
            }
            else{

                reportFile.setReport(reportOpt.get());
                reportFile.setReportDescription(request.getReportDescription());
                reportFile.setUploadDate(request.getUploadDate());
                reportOpt.get().setUploadDate(request.getUploadDate());
            }

            if(request.getFileData() == null){

                reportFile.setFileName(null);
                reportFile.setFileData(null);
            }
            else{

                reportFile.setFileData(request.getFileData().getBytes());
                reportFile.setReportDescription(request.getReportDescription());
                String fileName = StringUtils.cleanPath(request.getFileData().getOriginalFilename());
                reportFile.setFileName(fileName);
            }
            reportFile.setId(request.getId());
            reportFileRepository.save(reportFile);
            Student student = studentRepository.findById(request.getStudentId()).get();
            student.setStatus("Report Uploaded");
            studentRepository.save(student);
            return true;
        } catch (IOException e) {

            e.printStackTrace();
            return false;
        }
    }

    public boolean removeAllReportFiles() {

        reportFileRepository.deleteAll();
        return true;
    }

    public boolean removeReportFile(Long reportFileId){

        Optional<ReportFile> reportFileOpt = reportFileRepository.findById(reportFileId);
        if (!reportFileOpt.isPresent()) {

            return false;
        }

        reportFileRepository.deleteById(reportFileId);
        return true;
    }

    public boolean editReportFile(Long id, ReportFileEditRequest request) {

        Optional<ReportFile> reportFileOpt = reportFileRepository.findById(id);
        if (!reportFileOpt.isPresent()) {

            return false;
        }
        reportFileRepository.deleteById(id);

        ReportFile newReportFile = new ReportFile();
        Optional<Report> reportOpt = reportRepository.findById(request.getReportId());
        if(!reportOpt.isPresent()){

            return false;
        }
        else {

            newReportFile.setReport(reportOpt.get());
        }
        newReportFile.setId(id);
        newReportFile.setFileName(request.getFileData().getName());
        try {

            newReportFile.setFileData(request.getFileData().getBytes());
        } catch (IOException e) {

            e.printStackTrace();
            return false;
        }
        return true;
    }
}