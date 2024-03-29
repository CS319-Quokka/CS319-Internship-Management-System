package com.quokka.backend.controller;

import com.quokka.backend.Auth.FeedbackFileResponse;
import com.quokka.backend.Auth.ReportFileResponse;
import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.FeedbackFile;
import com.quokka.backend.models.Report;
import com.quokka.backend.models.ReportFile;
import com.quokka.backend.request.FeedbackAddRequest;
import com.quokka.backend.request.FeedbackFileAddRequest;
import com.quokka.backend.request.FeedbackFileEditRequest;
import com.quokka.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

/**
 * This class is responsible for handling all the requests coming from the frontend related to feedback.
 */
@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {

    private FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService){
        this.feedbackService = feedbackService;
    }

    @GetMapping("/get_feedback_by_report/{reportId}")
    public ResponseEntity<?> getFeedback(@PathVariable("reportId") Long reportId) {
        Feedback feedback = feedbackService.findByReportId(reportId);

        if (feedback == null) {
            return ResponseEntity.ok("No feedback available for this report");
        }

        FeedbackFile feedbackFile = feedbackService.getFeedbackFileByFeedbackId(feedback.getId());

        if (feedbackFile == null) {
            return ResponseEntity.ok("No feedback file available for this feedback");
        }

        FeedbackFileResponse response = new FeedbackFileResponse();
        response.setFileData(feedbackFile.getFileData());
        response.setFeedbackId(feedback.getId());
        response.setFeedbackDescription(feedback.getFeedbackDescription());
        response.setFileName(feedbackFile.getFileName());

        return ResponseEntity.ok(response);
    }


    @GetMapping
    public List<Feedback> getAllFeedback(){
        return feedbackService.getAllFeedback();
    }

    @PostMapping
    public ResponseEntity<Long> addFeedback(@RequestBody FeedbackAddRequest request) {
        Long feedbackId = feedbackService.addFeedback(request);
        return ResponseEntity.ok(feedbackId);
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

    @GetMapping("/description/{reportId}")
    public String getFeedbackDescription(@PathVariable Long reportId){
        return feedbackService.getFeedbackDescription(reportId);

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