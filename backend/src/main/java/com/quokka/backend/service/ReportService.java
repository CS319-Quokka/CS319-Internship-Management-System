package com.quokka.backend.service;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.models.Student;
import com.quokka.backend.repository.ReportFileRepository;
import com.quokka.backend.repository.ReportRepository;
import com.quokka.backend.repository.StudentRepository;
import com.quokka.backend.request.ReportAddRequest;
import com.quokka.backend.request.ReportEditRequest;
import com.quokka.backend.request.ReportFileAddRequest;
import com.quokka.backend.request.ReportFileEditRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.io.IOException;

import org.springframework.util.StringUtils;


@Service
public class ReportService {


    private ReportRepository reportRepository;
    private ReportFileRepository reportFileRepository;
    private StudentRepository studentRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository, ReportFileRepository reportFileRepository, StudentRepository studentRepository){

        this.reportFileRepository = reportFileRepository;
        this.reportRepository = reportRepository;
        this.studentRepository = studentRepository;
    }

    public Report getReportWithID(Long ID){
        Optional<Report> report = reportRepository.findById(ID);
        if(!report.isPresent()){
            throw new IllegalStateException("No report found!");
        }

        return report.get();
    }

    public List<Report> getAllReports(){

        return reportRepository.findAll();
    }

    public String checkReportStatus(Long StudentID){

        return getReportWithID(StudentID).getStatus();
    }

    public boolean addReport(ReportAddRequest request){

        Report newInternshipReport = new Report();
        Optional<Student> student = studentRepository.findById(request.getStudentId());
        if(!student.isPresent()){

            newInternshipReport.setStudent(null);
        }
        else{

            newInternshipReport.setStudent(student.get());
        }
        newInternshipReport.setId(request.getId());
        newInternshipReport.setReportDescription(request.getReportDescription());
        newInternshipReport.setDeadline(request.getDeadline());
        reportRepository.save(newInternshipReport);
        return true;
    }

    public boolean reportExceptionCheck(Long reportID, Date date){

        if(!reportRepository.existsById(reportID)){

            throw new IllegalStateException("No report is found!");
        }

        if(getReportWithID(reportID).getDeadline().after(date)){

            throw new IllegalStateException("It is passed the deadline!");
        }
        return true;
    }

    public boolean removeReport(Long reportID, Date date){

        if(reportExceptionCheck(reportID,date)){

            reportRepository.deleteById(reportID);
            return true;
        }
        return false;
    }

    public boolean editReport(Long reportID, ReportEditRequest request){

        if(reportExceptionCheck(reportID, request.getDeadline())){

            Optional<Report> reportOpt = reportRepository.findById(reportID);
            if(!reportOpt.isPresent()){

                return false;
            }

            removeReport(reportID, request.getDeadline());
            Report editedReport = new Report();
            editedReport.setReportDescription(request.getReportDescription());
            editedReport.setStudent(studentRepository.findById(request.getStudentId()).get());
            editedReport.setDeadline(request.getDeadline());
            reportRepository.save(editedReport);
            return true;
        }
        return false;
    }

    public ReportFile getReportFileWithReportId(Long id){

        return null;
    }

    public List<ReportFile> getAllReportFiles(){

        return reportFileRepository.findAll();
    }

    public boolean addReportFile(ReportFileAddRequest request){

        if(request == null){

            return false;
        }

        try {

            ReportFile reportFile =  new ReportFile();
            Optional<Report> reportOpt = reportRepository.findById(request.getReportId());
            if(!reportOpt.isPresent()){

                reportFile.setReport(null);
            }
            else{

                reportFile.setReport(reportOpt.get());
            }
            if(request.getFileData() == null){

                reportFile.setFileName(null);
                reportFile.setFileData(null);
            }
            else{

                reportFile.setFileData(request.getFileData().getBytes());
                String fileName = StringUtils.cleanPath(request.getFileData().getOriginalFilename());
                reportFile.setFileName(fileName);
            }
            reportFile.setId(request.getId());
            reportFileRepository.save(reportFile);
            return true;
        }
        catch(IOException e){

            e.printStackTrace();
            return false;
        }
    }

    public boolean removeAllReportFiles(){

        reportFileRepository.deleteAll();
        return true;
    }

    public boolean removeReportFile(Long reportFileId){

        Optional<ReportFile> reportFileOpt = reportFileRepository.findById(reportFileId);
        if(!reportFileOpt.isPresent()){

            return false;
        }

        reportFileRepository.deleteById(reportFileId);
        return true;
    }

    public boolean editReportFile(Long id, ReportFileEditRequest request){

        Optional<ReportFile> reportFileOpt = reportFileRepository.findById(id);
        if(!reportFileOpt.isPresent()){

            return false;
        }
        reportFileRepository.deleteById(id);

        ReportFile newReportFile = new ReportFile();
        Optional<Report> reportOpt = reportRepository.findById(request.getReportId());
        if(!reportOpt.isPresent()){

            return false;
        }
        else{

            newReportFile.setReport(reportOpt.get());
        }
        newReportFile.setId(id);
        newReportFile.setFileName(request.getFileData().getName());
        try {

            newReportFile.setFileData(request.getFileData().getBytes());
        }
        catch(IOException e) {

            throw new RuntimeException(e);
        }
        return true;
    }
}