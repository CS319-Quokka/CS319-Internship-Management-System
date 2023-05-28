package com.quokka.backend.service;

import com.quokka.backend.models.*;
import com.quokka.backend.repository.*;
import com.quokka.backend.request.FeedbackAddRequest;
import com.quokka.backend.request.FeedbackFileAddRequest;
import com.quokka.backend.request.FeedbackFileEditRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    private FeedbackRepository feedbackRepository;

    private ReportService reportService;
    private TeachingAssistantRepository teachingAssistantRepository;
    private InstructorRepository instructorRepository;
    private FeedbackFileRepository feedbackFileRepository;
    private StudentRepository studentRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository, ReportService reportService,
                           TeachingAssistantRepository teachingAssistantRepository,
                           InstructorRepository instructorRepository,
                           FeedbackFileRepository feedbackFileRepository,
                           StudentRepository studentRepository){

        this.feedbackRepository = feedbackRepository;
        this.reportService = reportService;
        this.teachingAssistantRepository = teachingAssistantRepository;
        this.instructorRepository = instructorRepository;
        this.feedbackFileRepository = feedbackFileRepository;
        this.studentRepository = studentRepository;
    }

    public Feedback getFeedback(Long ID){

        Optional<Feedback> feedback = feedbackRepository.findById(ID);
        if(!feedback.isPresent()){

            return null;
        }
        return feedback.get();
    }

    public List<Feedback> getAllFeedback(){

        return feedbackRepository.findAll();
    }

    public String getFeedbackDescription(Long reportId){
        Feedback feedback = findByReportId(reportId);
        if(feedback == null){
            return "";
        }
        return feedback.getFeedbackDescription();

    }

    public Long addFeedback(FeedbackAddRequest request){

        Feedback newFeedback = new Feedback();
        Report report = reportService.getReportWithID(request.getReportId());
        if(report == null){

            System.out.println("REPORT NOT FOUND");
            newFeedback.setReport(null);
        }
        else {

            newFeedback.setReport(report);
        }

        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(request.getSenderId());
        Optional<Instructor> instructorOpt = instructorRepository.findById(request.getSenderId());
        if(teachingAssistantOpt.isPresent()){

            newFeedback.setSender(teachingAssistantOpt.get());
        }
        else if(instructorOpt.isPresent()){

            System.out.println("ınstructor FOUND");
            newFeedback.setSender(instructorOpt.get());
        }
        else{

            newFeedback.setSender(null);
        }

        if(request.getFeedbackDescription() == null){

            newFeedback.setFeedbackDescription("");
        }
        else{

            newFeedback.setFeedbackDescription(request.getFeedbackDescription());
        }

        System.out.println("FEEDBACK UPLOAD ");
        newFeedback.setId(request.getId());
        newFeedback.setUploadDate(request.getUploadDate());
        feedbackRepository.save(newFeedback);
        return newFeedback.getId();
    }
    public Feedback findByReportId(Long reportId) {

        System.out.println("FEEDBACK ARANIYORR: " + reportId);


        Optional<Feedback> feedback = feedbackRepository.findByReportId(reportId);


        if(feedback.isPresent()){
            return feedback.get();
        }
        return null;
    }

    public boolean removeAllFeedbacks(){

        feedbackRepository.deleteAll();
        return true;
    }

    public boolean removeFeedback(Long feedbackID){

        Optional<Feedback> feedback = feedbackRepository.findById(feedbackID);
        if(!feedback.isPresent()){

            return false;
        }
        feedbackRepository.deleteById(feedbackID);
        return true;
    }

    public boolean editFeedback(Long feedbackID, FeedbackAddRequest request){

        Optional<Feedback> feedbackOpt = feedbackRepository.findById(feedbackID);
        if(!feedbackOpt.isPresent()){

            return false;
        }

        Feedback editedFeedback = new Feedback();
        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(request.getSenderId());
        Optional<Instructor> instructorOpt = instructorRepository.findById(request.getSenderId());
        if(teachingAssistantOpt.isPresent()){

            editedFeedback.setSender(teachingAssistantOpt.get());
        }
        else if(instructorOpt.isPresent()){

            editedFeedback.setSender(instructorOpt.get());
        }
        else{

            editedFeedback.setSender(null);
        }
        removeFeedback(feedbackID);

        editedFeedback.setId(feedbackID);
        editedFeedback.setFeedbackDescription(request.getFeedbackDescription());
        editedFeedback.setReport(reportService.getReportWithID(request.getReportId()));
        editedFeedback.setUploadDate(request.getUploadDate());
        return true;
    }

    public FeedbackFile getFeedbackFileById(Long id){

        Optional<FeedbackFile> feedbackFileOpt = feedbackFileRepository.findById(id);
        if(!feedbackFileOpt.isPresent()){
            return null;
        }
        return feedbackFileOpt.get();

    }
    public FeedbackFile getFeedbackFileByFeedbackId(Long id){

        Optional<FeedbackFile> feedbackFileOpt = feedbackFileRepository.findByFeedbackId(id);
        if(!feedbackFileOpt.isPresent()){
            return null;
        }
        return feedbackFileOpt.get();
    }

    public List<FeedbackFile> getAllFeedbackFiles(){

        return feedbackFileRepository.findAll();
    }

    public boolean addFeedbackFile(FeedbackFileAddRequest request) throws IOException {

        if(request == null){

            return false;
        }

        try{

            System.out.println("came to the feedback");
            FeedbackFile newFeedbackFile = new FeedbackFile();
            Optional<Feedback> feedbackOpt = feedbackRepository.findById(request.getFeedbackId());
            if(!feedbackOpt.isPresent()){

                newFeedbackFile.setFeedback(null);
            }
            else{

                newFeedbackFile.setFeedback(feedbackOpt.get());
            }

            if(request.getFileData() == null){

                newFeedbackFile.setFileData(null);
                newFeedbackFile.setFileName(null);
            }
            else{

                newFeedbackFile.setFileData(request.getFileData().getBytes());
                String fileName = StringUtils.cleanPath(request.getFileData().getOriginalFilename());
                newFeedbackFile.setFileName(fileName);
            }

            newFeedbackFile.setId(request.getId());
            newFeedbackFile.setFeedbackDescription(request.getFeedbackDescription());
            studentRepository.findById(request.getStudentId()).get().setStatus("Revision required");
            feedbackFileRepository.save(newFeedbackFile);
            return true;
        }
        catch (IOException e){

            e.printStackTrace();
            return false;
        }
    }

    public boolean removeAllFeedbackFiles(){

        feedbackFileRepository.deleteAll();
        return true;
    }

    public boolean removeFeedbackFile(Long feedbackFileId){

        Optional<FeedbackFile> feedbackFileOpt = feedbackFileRepository.findById(feedbackFileId);
        if(!feedbackFileOpt.isPresent()){

            return false;
        }

        feedbackFileRepository.deleteById(feedbackFileId);
        return true;
    }

    public boolean editFeedbackFile(Long id, FeedbackFileEditRequest request){

        Optional<FeedbackFile> feedbackFileOpt = feedbackFileRepository.findById(id);
        if(!feedbackFileOpt.isPresent()){

            return false;
        }
        feedbackFileRepository.deleteById(id);

        FeedbackFile editedFeedbackFile = new FeedbackFile();
        Optional<Feedback> feedbackOpt = feedbackRepository.findById(request.getFeedbackId());
        if(!feedbackOpt.isPresent()){

            return false;
        }
        else{

            editedFeedbackFile.setFeedback(feedbackOpt.get());
        }

        editedFeedbackFile.setId(id);
        editedFeedbackFile.setFeedbackDescription(request.getFeedbackDescription());
        String fileName = StringUtils.cleanPath(request.getFileData().getOriginalFilename());
        editedFeedbackFile.setFileName(fileName);
        try{

            editedFeedbackFile.setFileData(request.getFileData().getBytes());
        }
        catch (IOException e){

            e.printStackTrace();
            return false;
        }
        return true;
    }
}