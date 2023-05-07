package com.quokka.backend.service;

import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.UserProfile;
import com.quokka.backend.repository.FeedbackRepository;
import com.quokka.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    private FeedbackRepository feedbackRepository;
    private ReportRepository reportRepository;
    @Autowired
    public  FeedbackService(FeedbackRepository feedbackRepository, ReportRepository reportRepository){
        this.feedbackRepository = feedbackRepository;
        this.reportRepository = reportRepository;


    }

    //get the feedback with this ID if it exists. If not throw an exception.
    public Feedback getFeedback(long ID){
        Optional<Feedback> feedback = feedbackRepository.findById(ID);
        if(!feedback.isPresent()){
            throw new IllegalStateException("No feedback is found!");
        }
        return feedback.get();

    }

    //get the all feedback with this ID if they exist. If not throw an exception.
    public List<Feedback> getAllFeedback(){

        return feedbackRepository.findAll();

    }

    //Add a new feedback to a given report
    public boolean addFeedback(long reportID, UserProfile sender, Date date, File feedbackFile, String feedbackDescription){

        if(feedbackFile == null && feedbackDescription == null){
            throw new IllegalStateException("Cannot add feedback!");
        }

        Optional<Report> report = reportRepository.findById(reportID);

        if (!report.isPresent()) {
            throw new IllegalArgumentException("Report with ID " + reportID + " not found");
        }
        Report internshipReport = report.get();



        Feedback newFeedback = new Feedback();
        newFeedback.setId(reportID);
        newFeedback.setAnnotatedPDFfile(feedbackFile);
        newFeedback.setFeedbackDescription(feedbackDescription);
        newFeedback.setDate(date);
        newFeedback.setSender(sender);

        internshipReport.setFeedback(newFeedback);

        return true;

    }


    public boolean removeFeedback(long feedbackID){
        Optional<Feedback> feedback = feedbackRepository.findById(feedbackID);

        //check if the given feedback exists
        if (!feedback.isPresent()) {
            throw new IllegalArgumentException("Feedback with ID " + feedback + " not found");
        }

        feedbackRepository.deleteById(feedbackID);
        return true;

    }

    public boolean editFeedback(long feedbackID, Feedback newFeedback){


        Optional<Feedback> feedback = feedbackRepository.findById(feedbackID);
        if (!feedback.isPresent()) {
            throw new IllegalArgumentException("Feedback with ID " + feedback + " not found");
        }

        //get the possible changes and save it to feedback repository
        feedback.get().setAnnotatedPDFfile(newFeedback.getAnnotatedPDFfile());
        feedback.get().setFeedbackDescription(newFeedback.getFeedbackDescription());
        feedback.get().setDate(newFeedback.getDate()); //not sure about this part
        feedbackRepository.save(feedback.get());
        return true;

    }

}
