package com.quokka.backend.service;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.models.Student;
import com.quokka.backend.repository.ReportFileRepository;
import com.quokka.backend.repository.ReportRepository;
import com.quokka.backend.repository.StudentRepository;
import com.quokka.backend.request.ReportFileAddRequest;
import com.quokka.backend.request.ReportFileEditRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.io.IOException;

import org.apache.commons.io.IOUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
    //    reportFileRepository.save(reportFile1);

        System.out.println("here");
        //reportFile1.setReport(newInternshipReport); //not sure about this part
        newInternshipReport.setReportDescription(reportDescription);
        reportRepository.save(newInternshipReport);
        System.out.println("here not");
        return true;


    }

    //this is a method to not duplicate the code. It will check if we can make changes
    // about the report(remove or delete), it returns true when changes are available
    public boolean reportExceptionCheck(Long reportID, Date date){
        if(!reportRepository.existsById(reportID)){
            throw new IllegalStateException("No report is found!");
        }

        /*
        //if the feedback is already given you cannot make changes
        if(getReportWithID(reportID).getFeedback() != null){
            throw new IllegalStateException("Feedback is already added!");
        }

         */

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

            //  ReportFile reportFile = reportFileRepository.findByReportId(newReport.getId()).get();
            removeReport(reportID, date);
          //  addReport(newReport.getStudent().getId(), reportFile, newReport.getReportDescription());
            reportRepository.save(currentReport.get());
            return true;
        }
        return false;
    }

    public ReportFile getReportFileWithReportId(Long id){

        //Optional<ReportFile> reportFileOpt = reportFileRepository.findByReportId(id);
        /*

        if(reportFileOpt.isPresent()){

            return reportFileOpt.get();
        }


         */
        return null;
    }

    public List<ReportFile> getAllReportFiles(){

        return reportFileRepository.findAll();
    }

    public boolean addReportFile(ReportFileAddRequest request){

        System.out.println("trying to upload 2");

        if(request == null){
            System.out.println("request is empty!!");
            return false;
        }
        System.out.println("COULD IT FIND REPORT");

        try {
            MultipartFile file = request.getFileData();
            byte[] fileData = file.getBytes();
            ReportFile reportFile =  new ReportFile();


            reportFile.setFileData(fileData);
            reportFile.setFileName(file.getName());
            Report report = new Report();
            report.setReportDescription("internship added");
            report.setStatus("Pending feedback");
            System.out.println("ID: " + request.getSenderId());
            Optional<Student> s= studentRepository.findById(request.getSenderId());

            if(s == null){
                System.out.println("NO STUDENT");
                return false;
            }


            System.out.println("report repo?");
            report.setStudent(s.get());

            reportFile.setReport(report);

            reportRepository.save(report);

            System.out.println("TRY saving the report");

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            System.out.println(reportFile.getId() + " " +fileName + " " + reportFile.getFileData());
            System.out.println("finishes");
            reportFileRepository.save(reportFile);


            System.out.println(Arrays.toString(fileData));
            System.out.println("saves");
            return true;
        } catch (IOException e) {
            System.out.println("IO EXCETPTION");
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

        reportFileOpt.get().setFileData(request.getFileData());
        reportFileOpt.get().setFileName(request.getFileName());
      //  reportFileOpt.get().setReport(reportRepository.findById(request.getReportId()).get());
        return true;
    }
}