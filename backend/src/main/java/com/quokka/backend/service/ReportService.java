package com.quokka.backend.service;
import com.quokka.backend.models.Report;
import com.quokka.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {


    private ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
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

    public boolean addReport(Long StudentID,File reportFile, String reportDescription){


        if(reportFile == null){
            throw new IllegalStateException("File cannot be empty!");

        }
        if(reportDescription == null){
            throw new IllegalStateException("Description necessary!");
        }

        Report newInternshipReport = new Report();
        newInternshipReport.setId(StudentID); //not sure about his part
        newInternshipReport.setReportFile(reportFile);
        newInternshipReport.setRevisionDescription(reportDescription);
        reportRepository.save(newInternshipReport);
        return true;


    }

    //this is a method to not duplicate the code. It will check if we can make changes
    // about the report(remove or delete), it returns true when changes are available
    public boolean reportExceptionCheck(Long reportID, Date date){
        if(!reportRepository.existsById(reportID)){
            throw new IllegalStateException("No report is found!");
        }

        //if the feedback is already given you cannot make changes
        if(getReportWithID(reportID).getFeedback() != null){
            throw new IllegalStateException("Feedback is already added!");
        }

        //if the deadline has passed, you cannot make changes
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
    public boolean editReport(Long reportID, Date date, Report newReport){
        if(reportExceptionCheck(reportID,date)) {
            Optional<Report> currentReport = reportRepository.findById(reportID);
            currentReport.get().setReportFile(newReport.getReportFile());
            currentReport.get().setRevisionDescription(newReport.getRevisionDescription());
            currentReport.get().setUploadDate(date);
            reportRepository.save(currentReport.get());
            return true;
        }
        return false;

    }

}



