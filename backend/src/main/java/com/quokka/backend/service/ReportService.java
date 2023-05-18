package com.quokka.backend.service;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.repository.ReportFileRepository;
import com.quokka.backend.repository.ReportRepository;
import com.quokka.backend.request.ReportFileAddRequest;
import com.quokka.backend.request.ReportFileEditRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {


    private ReportRepository reportRepository;
    private ReportFileRepository reportFileRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository, ReportFileRepository reportFileRepository){

        this.reportFileRepository = reportFileRepository;
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

    public boolean addReport(Long StudentID, ReportFile reportFile, String reportDescription){


        if(reportFile == null){
            throw new IllegalStateException("File cannot be empty!");
        }
        if(reportDescription == null){
            throw new IllegalStateException("Description necessary!");
        }

        Report newInternshipReport = new Report();


        ReportFile reportFile1 = new ReportFile();
        reportFile1.setFileName(reportFile.getFileName());
        reportFile1.setFileData(reportFile.getFileData());
        reportFileRepository.save(reportFile1);

        reportFile1.setReport(newInternshipReport); //not sure about this part
        newInternshipReport.setReportDescription(reportDescription);
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
            if(!currentReport.isPresent()){

                return false;
            }

            ReportFile reportFile = reportFileRepository.findByReportId(newReport.getId()).get();
            removeReport(reportID, date);
            addReport(newReport.getStudent().getId(), reportFile, newReport.getReportDescription());
            reportRepository.save(currentReport.get());
            return true;
        }
        return false;
    }

    public ReportFile getReportFileWithReportId(Long id){

        Optional<ReportFile> reportFileOpt = reportFileRepository.findByReportId(id);
        if(reportFileOpt.isPresent()){

            return reportFileOpt.get();
        }
        return null;
    }

    public List<ReportFile> getAllReportFiles(){

        return reportFileRepository.findAll();
    }

    public boolean addReportFile(ReportFileAddRequest request){

        Report report = this.getReportWithID(request.getReportId());
        if(report == null){

            return false;
        }

        ReportFile reportFile = new ReportFile();
        reportFile.setReport(report);
        reportFile.setId(request.getId());
        reportFile.setFileName(request.getFileName());
        reportFile.setFileData(request.getFileData());

        reportFileRepository.save(reportFile);
        return true;
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

        reportFileOpt.get().setFileData(request.getFileData());
        reportFileOpt.get().setFileName(request.getFileName());
        reportFileOpt.get().setReport(reportRepository.findById(request.getReportId()).get());
        return true;
    }
}