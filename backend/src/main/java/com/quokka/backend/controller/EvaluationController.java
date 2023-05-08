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
@RequestMapping("/gradeForm")
public class EvaluationController {

    //private GradeFormStrategy gradeFormStrategy;
    private EvaluationService evaluationService;


    public EvaluationController(EvaluationService evaluationService
                                //GradeFormStrategy gradeFormStrategy
                                ){
        this.evaluationService = evaluationService;
        //this.gradeFormStrategy = gradeFormStrategy;
    }

    //public File getCompanyEvaluonForm(long ID){}

    //public List<File> getAllCompanyEvaluationForms(){}

    @GetMapping("gradeForm/{id}")
    public GradeForm getGradeForm(long ID){
        return evaluationService.getGradeForm(ID);
    }
    @GetMapping
    public List<GradeForm> getAllGradeForms(){
        return evaluationService.getAllGradeForms();
    }

    @PostMapping("/gradeForm")
    public boolean addGradeForm(@RequestParam("studentID") long studentID,
                                @RequestParam("gradeForm") GradeForm gradeForm) {
        return evaluationService.addGradeForm(studentID, gradeForm);
    }

    @DeleteMapping("/gradeForm/{id}")
    public boolean removeGradeForm(@PathVariable("id") long ID){
        return evaluationService.removeGradeForm(ID);
    }
}
