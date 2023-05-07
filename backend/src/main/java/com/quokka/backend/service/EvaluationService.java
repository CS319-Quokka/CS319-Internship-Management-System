package com.quokka.backend.service;

import com.quokka.backend.models.GradeForm;
import com.quokka.backend.models.Student;
import com.quokka.backend.repository.EvaluationRepository;
import com.quokka.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {

    private EvaluationRepository evaluationRepository;
    private StudentRepository studentRepository;

    @Autowired
    public EvaluationService(EvaluationRepository evaluationRepository){
        this.evaluationRepository = evaluationRepository;
    }

    public File getCompanyEvaluationForm(long studentID){
        Optional<Student> student = studentRepository.findById(studentID);

        if(!student.isPresent()){
            throw new IllegalStateException("No student is found!");
        }

        Student studentToGetCompanyEvaluationForm = student.get();

        return studentToGetCompanyEvaluationForm.getCompanyEvaluationForm();
    }

    //public List<File> getAllCompanyEvaluationForms(){}

    public GradeForm getGradeForm(long ID){
        Optional<GradeForm> gradeForm = evaluationRepository.findById(ID);
        if(!gradeForm.isPresent()){
            throw new IllegalStateException("No grade form is found!");
        }
        return gradeForm.get();
    }

    public List<GradeForm> getAllGradeForms(){
        return evaluationRepository.findAll();
    }

    public boolean addCompanyEvaluationForm(long studentID, File companyEvaluationForm, Date date){
        if(companyEvaluationForm == null){
            throw new IllegalArgumentException("Cannot add company evaluation form!");
        }

        Optional<Student> student = studentRepository.findById(studentID);

        if (!student.isPresent()) {
            throw new IllegalArgumentException("Student with ID " + studentID + " not found");
        }

        Student studentToAddForm = student.get();
        studentToAddForm.setCompanyEvaluationForm(companyEvaluationForm);

        return true;
    }

    public boolean removeCompanyEvaluationForm(long studentID){
        Optional<Student> student = studentRepository.findById(studentID);

        if (!student.isPresent()) {
            throw new IllegalArgumentException("Student with ID " + studentID + " not found");
        }

        Student studentToRemoveCompanyEvaluationForm = student.get();
        studentToRemoveCompanyEvaluationForm.setCompanyEvaluationForm(null);

        return true;
    }

    public boolean addGradeForm(long studentID, GradeForm gradeForm){
        Optional<Student> student = studentRepository.findById(studentID);

        if (!student.isPresent()) {
            throw new IllegalArgumentException("Student with ID " + studentID + " not found");
        }

        Student studentToAddGradeForm = student.get();
        studentToAddGradeForm.setGradeForm(gradeForm);

        return true;
    }

    public boolean removeGradeForm(long ID){
        Optional<GradeForm> gradeForm = evaluationRepository.findById(ID);
        if (!gradeForm.isPresent()) {
            throw new IllegalArgumentException("Grade form with ID " + ID + " not found");
        }

        evaluationRepository.deleteById(ID);
        return true;
    }
}
