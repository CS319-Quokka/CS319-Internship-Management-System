package com.quokka.backend.controller;

import com.quokka.backend.models.Feedback;
import com.quokka.backend.models.GradeForm;
import com.quokka.backend.models.UserProfile;
import com.quokka.backend.repository.EvaluationRepository;
import com.quokka.backend.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/grade_form")
public class EvaluationController {

    private EvaluationService evaluationService;


    public EvaluationController(EvaluationService evaluationService){
        this.evaluationService = evaluationService;
    }

    //public File getCompanyEvaluonForm(long ID){}

    //public List<File> getAllCompanyEvaluationForms(){}

    @GetMapping("/grade_form/get/{id}")
    public GradeForm getGradeForm(@PathVariable long id){
        return evaluationService.getGradeForm(id);
    }
    @GetMapping("/grade_form/get_all")
    public List<GradeForm> getAllGradeForms(){
        return evaluationService.getAllGradeForms();
    }

    @PostMapping("/gradeForm/add/{studentID}")
    public boolean addGradeForm(@PathVariable @RequestParam("studentID") long studentID,
                                @RequestBody GradeForm gradeForm) {
        return evaluationService.addGradeForm(studentID, gradeForm);
    }

    @DeleteMapping("/gradeForm/delete/{id}")
    public boolean removeGradeForm(@PathVariable long id){
        return evaluationService.removeGradeForm(id);
    }
}
