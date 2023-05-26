package com.quokka.backend.service;

import com.quokka.backend.controller.FeedbackController;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.models.Student;
import com.quokka.backend.repository.FeedbackRepository;
import com.quokka.backend.repository.ReportFileRepository;
import com.quokka.backend.repository.ReportRepository;
import com.quokka.backend.repository.StudentRepository;
import com.quokka.backend.request.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.util.StringUtils;


@Service
public class ReportService {


    private ReportRepository reportRepository;
    private ReportFileRepository reportFileRepository;
    private StudentRepository studentRepository;
    private FeedbackRepository feedbackRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository, ReportFileRepository reportFileRepository,
                         StudentRepository studentRepository, FeedbackRepository feedbackRepository) {

        this.feedbackRepository = feedbackRepository;
        this.reportFileRepository = reportFileRepository;
        this.reportRepository = reportRepository;
        this.studentRepository = studentRepository;
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
        student.get().setStatus("Waiting for the student to upload the report");
        student.get().setActiveReportId(newInternshipReport.getId());
        newInternshipReport.setId(request.getId());
        newInternshipReport.setDeadline(request.getDeadline());
        reportRepository.save(newInternshipReport);
        return true;
    }

    public List<Report> getAllReportsByStudentId(Long studentId) {

        System.out.println("1");
        List<Report> reports = new ArrayList<Report>();
        for (Report report : reportRepository.findAll()) {

            System.out.println("r: "+report);
            if (report.getStudent().getId() == studentId) {

                reports.add(report);
            }
        }
        System.out.println("2 " + reports);
        return reports;
    }

    public boolean removeAllReports() {

        reportRepository.deleteAll();
        return true;
    }

    public boolean reportExceptionCheck(Long reportID, Date date) {

        if (!reportRepository.existsById(reportID)) {

            throw new IllegalStateException("No report is found!");
        }

        if (getReportWithID(reportID).getDeadline().after(date)) {

            throw new IllegalStateException("It is passed the deadline!");
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
            throw new RuntimeException("ReportFile not found for report ID: " + id);
        }
    }


    public Report getActiveReport(Long studentId) {

        List<Report> reports = new ArrayList<Report>();
        for (Report report : reportRepository.findAll()) {

            if (report.getStudent().getId() == studentId) {

                reports.add(report);
            }
        }
        return reports.get(reports.size()-1);
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
            studentRepository.findById(request.getStudentId()).get().setStatus("Waiting for feedback");
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