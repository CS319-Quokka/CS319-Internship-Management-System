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
    private ReportRepository reportRepository;
    private TeachingAssistantRepository teachingAssistantRepository;
    private InstructorRepository instructorRepository;
    private FeedbackFileRepository feedbackFileRepository;
    private StudentRepository studentRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository, ReportRepository reportRepository,
                           TeachingAssistantRepository teachingAssistantRepository,
                           InstructorRepository instructorRepository,
                           FeedbackFileRepository feedbackFileRepository,
                           StudentRepository studentRepository){

        this.feedbackRepository = feedbackRepository;
        this.reportRepository = reportRepository;
        this.teachingAssistantRepository = teachingAssistantRepository;
        this.instructorRepository = instructorRepository;
        this.feedbackFileRepository = feedbackFileRepository;
        this.studentRepository = studentRepository;
    }

    public Feedback getFeedback(Long ID){

        Optional<Feedback> feedback = feedbackRepository.findById(ID);
        if(!feedback.isPresent()){

            throw new IllegalStateException("No feedback is found!");
        }
        return feedback.get();
    }

    public List<Feedback> getAllFeedback(){

        return feedbackRepository.findAll();
    }

    public boolean addFeedback(FeedbackAddRequest request){

        if(request.getFeedbackDescription() == null){

            throw new IllegalStateException("Cannot add feedback!");
        }

        Feedback newFeedback = new Feedback();
        Optional<Report> report = reportRepository.findById(request.getReportId());
        if(!report.isPresent()){

            newFeedback.setReport(null);
        }
        else{

            newFeedback.setReport(report.get());
        }

        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(request.getSenderId());
        Optional<Instructor> instructorOpt = instructorRepository.findById(request.getSenderId());
        if(teachingAssistantOpt.isPresent()){

            newFeedback.setSender(teachingAssistantOpt.get());
        }
        else if(instructorOpt.isPresent()){

            newFeedback.setSender(instructorOpt.get());
        }
        else{

            newFeedback.setSender(null);
        }

        newFeedback.setId(request.getId());
        newFeedback.setFeedbackDescription(request.getFeedbackDescription());
        newFeedback.setUploadDate(request.getUploadDate());
        feedbackRepository.save(newFeedback);
        return true;
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
        editedFeedback.setReport(reportRepository.findById(request.getReportId()).get());
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

    public List<FeedbackFile> getAllFeedbackFiles(){

        return feedbackFileRepository.findAll();
    }

    public boolean addFeedbackFile(FeedbackFileAddRequest request) throws IOException {

        if(request == null){

            return false;
        }

        try{

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
            studentRepository.findById(request.getStudentId()).get().setStatus("Feedback is given");
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