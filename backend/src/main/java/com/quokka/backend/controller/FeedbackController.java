package com.quokka.backend.controller;

import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.FeedbackFile;
import com.quokka.backend.request.FeedbackAddRequest;
import com.quokka.backend.request.FeedbackFileAddRequest;
import com.quokka.backend.request.FeedbackFileEditRequest;
import com.quokka.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
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

    @GetMapping("/{id}")
    public Feedback getFeedback(@PathVariable Long id){
        return feedbackService.getFeedback(id);
    }

    @GetMapping
    public List<Feedback> getAllFeedback(){
        return feedbackService.getAllFeedback();
    }

    @PostMapping
    public boolean addFeedback(@RequestBody FeedbackAddRequest request){

        return feedbackService.addFeedback(request);
    }

    @DeleteMapping("/{id}")
    public boolean removeFeedback(@PathVariable("id") Long feedbackID){

        return feedbackService.removeFeedback(feedbackID);
    }

    @DeleteMapping
    public boolean removeAllFeedbacks(){

        return feedbackService.removeAllFeedbacks();
    }

    @PutMapping("/{id}")
    public boolean editFeedback(@PathVariable("id") Long feedbackID, @RequestBody FeedbackAddRequest newFeedback){

        return feedbackService.editFeedback(feedbackID,newFeedback);
    }

    @PostMapping("/file")
    public boolean addFeedbackFile(FeedbackFileAddRequest request) throws IOException {

        return feedbackService.addFeedbackFile(request);
    }

    @GetMapping("/file/{id}")
    public FeedbackFile getFeedbackFileById(@PathVariable Long id){

        return feedbackService.getFeedbackFileById(id);
    }

    @GetMapping("/file")
    public List<FeedbackFile> getAllFeedbackFiles(){

        return feedbackService.getAllFeedbackFiles();
    }

    @DeleteMapping("/file")
    public boolean removeAllFeedbackFiles(){

        return feedbackService.removeAllFeedbackFiles();
    }

    @DeleteMapping("/file/{id}")
    public boolean removeFeedbackFile(@PathVariable("id") Long id){

        return feedbackService.removeFeedbackFile(id);
    }

    @PatchMapping("/file/{id}")
    public boolean editFeedbackFileById(@PathVariable("id") Long id, FeedbackFileEditRequest request) throws IOException{

        return feedbackService.editFeedbackFile(id, request);
    }
}