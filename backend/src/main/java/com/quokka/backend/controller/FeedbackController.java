package com.quokka.backend.controller;

import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.UserProfile;
import com.quokka.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {

    private FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService){
        this.feedbackService = feedbackService;
    }

    @GetMapping("feedback/{id}")
    public Feedback getFeedback(long ID){
        return feedbackService.getFeedback(ID);
    }

    @GetMapping
    public List<Feedback> getAllFeedback(){
        return feedbackService.getAllFeedback();
    }


    @PostMapping("/feedback")
    public boolean addFeedback(@RequestParam("reportID") long reportID, @RequestBody UserProfile sender,
                               @RequestParam("date") Date date,
                               @RequestParam("feedbackFile") File feedbackFile,
                               @RequestParam("feedbackDescription") String feedbackDescription) {
        return feedbackService.addFeedback(reportID, sender, date, feedbackFile, feedbackDescription);
    }

    @DeleteMapping("/feedback/{id}")
    public boolean removeFeedback(@PathVariable("id") long feedbackID){
        return feedbackService.removeFeedback(feedbackID);

    }

    @PutMapping("/feedback/{id}")
    public boolean editFeedback(@PathVariable("id") long feedbackID, @RequestBody Feedback newFeedback){
        return feedbackService.editFeedback(feedbackID,newFeedback);
    }



}