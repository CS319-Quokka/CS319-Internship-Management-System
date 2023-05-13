package com.quokka.backend.controller;

import com.quokka.backend.models.GradeForm;
import com.quokka.backend.service.EvaluationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grade_form")
public class EvaluationController {

    /*private EvaluationService evaluationService;


    public EvaluationController(EvaluationService evaluationService){
        this.evaluationService = evaluationService;
    }

    //public File getCompanyEvaluonForm(long ID){}

    //public List<File> getAllCompanyEvaluationForms(){}

    @GetMapping("/{id}")
    public GradeForm getGradeForm(@PathVariable long id){
        return evaluationService.getGradeForm(id);
    }
    @GetMapping
    public List<GradeForm> getAllGradeForms(){
        return evaluationService.getAllGradeForms();
    }

    @PostMapping("/{studentID}")
    public boolean addGradeForm(@PathVariable @RequestParam("studentID") long studentID,
                                @RequestBody GradeForm gradeForm) {
        return evaluationService.addGradeForm(studentID, gradeForm);
    }

    @DeleteMapping("/{id}")
    public boolean removeGradeForm(@PathVariable long id){
        return evaluationService.removeGradeForm(id);
    }*/
}
