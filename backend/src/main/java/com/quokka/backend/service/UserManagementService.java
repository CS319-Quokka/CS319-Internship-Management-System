package com.quokka.backend.service;

import com.quokka.backend.exception.*;
import com.quokka.backend.models.*;
import com.quokka.backend.repository.*;
import com.quokka.backend.request.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserManagementService {

    private AccountService accountService;

    private  StudentRepository studentRepository;
    private  TeachingAssistantRepository teachingAssistantRepository;
    private  InstructorRepository instructorRepository;
    private  SummerTrainingCoordinatorRepository summerTrainingCoordinatorRepository;
    private  AdministrativeAssistantRepository administrativeAssistantRepository;

    @Autowired
    public UserManagementService(AccountService accountService, StudentRepository studentRepository,
                                 TeachingAssistantRepository teachingAssistantRepository,
                                 InstructorRepository instructorRepository,
                                 SummerTrainingCoordinatorRepository summerTrainingCoordinatorRepository,
                                 AdministrativeAssistantRepository administrativeAssistantRepository){

        this.accountService = accountService;

        this.studentRepository = studentRepository;
        this.teachingAssistantRepository = teachingAssistantRepository;
        this.instructorRepository = instructorRepository;
        this.summerTrainingCoordinatorRepository = summerTrainingCoordinatorRepository;
        this.administrativeAssistantRepository = administrativeAssistantRepository;
    }

    public List<User> getProfilesByAccountId(Long accountId) {

        List<User> returnList = new ArrayList<User>();

        returnList.addAll(studentRepository.findByUserAccountId(accountId));
        returnList.addAll(teachingAssistantRepository.findByUserAccountId(accountId));
        returnList.addAll(instructorRepository.findByUserAccountId(accountId));
        returnList.addAll(summerTrainingCoordinatorRepository.findByUserAccountId(accountId));
        returnList.addAll(administrativeAssistantRepository.findByUserAccountId(accountId));

        return returnList;
    }

    public Student addStudent(StudentAddRequest request){
        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        Instructor instructor = this.getInstructorByID(request.getInstructorId());
        if (instructor == null) {
            return null;
        }

        TeachingAssistant teachingAssistant = this.getTeachingAssistantByID(request.getTeachingAssistantId());
        if (teachingAssistant == null) {
            return null;
        }

        Student student = new Student();
        student.setId(request.getId());
        student.setCourseCode(request.getCourseCode());
        student.setLetterGrade(request.getLetterGrade());
        student.setCompanyName(request.getCompanyName());


        student.setUserAccount(account);
        student.setInstructor(instructor);
        student.setTeachingAssistant(teachingAssistant);

        return studentRepository.save(student);
    }

    public TeachingAssistant addTeachingAssistant(TeachingAssistantAddRequest request){

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        TeachingAssistant teachingAssistant = new TeachingAssistant();
        teachingAssistant.setUserAccount(account);

        return teachingAssistantRepository.save(teachingAssistant);
    }

    public Instructor addInstructor(InstructorAddRequest request) {

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        Instructor instructor = new Instructor();
        instructor.setUserAccount(account);

        return instructorRepository.save(instructor);
    }

    public SummerTrainingCoordinator addSummerTrainingCoordinator(SummerTrainingCoordinatorAddRequest request){

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        SummerTrainingCoordinator summerTrainingCoordinator = new SummerTrainingCoordinator();
        summerTrainingCoordinator.setUserAccount(account);

        return summerTrainingCoordinatorRepository.save(summerTrainingCoordinator);
    }

    public AdministrativeAssistant addAdministrativeAssistant(AdministrativeAssistantAddRequest request){

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        AdministrativeAssistant administrativeAssistant = new AdministrativeAssistant();
        administrativeAssistant.setUserAccount(account);

        return administrativeAssistantRepository.save(administrativeAssistant);
    }

    public void removeStudentByID(Long id) {

        studentRepository.deleteById(id);
    }

    public void removeTeachingAssistantByID(Long id)  {

        teachingAssistantRepository.deleteById(id);
    }

    public void removeInstructorByID(Long id) {

        instructorRepository.deleteById(id);
    }

    public void removeSummerTrainingCoordinatorByID(Long id) {

        summerTrainingCoordinatorRepository.deleteById(id);
    }

    public void removeAdministrativeAssistantByID(Long id) {

        administrativeAssistantRepository.deleteById(id);
    }

    public boolean removeAllStudents(){

        studentRepository.deleteAll();
        return true;
    }

    public boolean removeAllTeachingAssistants(){

        teachingAssistantRepository.deleteAll();
        return true;
    }

    public boolean removeAllInstructors(){

        instructorRepository.deleteAll();
        return true;
    }

    public boolean removeAllSummerTrainingCoordinators(){

        summerTrainingCoordinatorRepository.deleteAll();
        return true;
    }

    public boolean removeAllAdministrativeAssistants(){

        administrativeAssistantRepository.deleteAll();
        return true;
    }

        public List<Student> getAllStudents(Optional<Long> userAccountId, Optional <Long> instructorId, Optional <Long> teachingAssistantId){
        if(userAccountId.isPresent()){

            return studentRepository.findByUserAccountId(userAccountId.get());
        }

        if(instructorId.isPresent()){

            return studentRepository.findByInstructorId(instructorId.get());
        }

        if(teachingAssistantId.isPresent()){

            return studentRepository.findByTeachingAssistantId(teachingAssistantId.get());
        }

        return studentRepository.findAll();
    }

    public List<TeachingAssistant> getAllTeachingAssistants(Optional<Long> userAccountId){
        if(userAccountId.isPresent()){

            return teachingAssistantRepository.findByUserAccountId(userAccountId.get());
        }

        return teachingAssistantRepository.findAll();

    }

    public List<Instructor> getAllInstructors(Optional<Long> userAccountId){
        if(userAccountId.isPresent()){

            return instructorRepository.findByUserAccountId(userAccountId.get());
        }

        return instructorRepository.findAll();

    }

    public List<SummerTrainingCoordinator> getAllSummerTrainingCoordinators(Optional<Long> userAccountId){
        if (userAccountId.isPresent()){

            return summerTrainingCoordinatorRepository.findByUserAccountId(userAccountId.get());
        }

        return summerTrainingCoordinatorRepository.findAll();


    }

    public List<AdministrativeAssistant> getAllAdministrativeAssistants(Optional<Long> userAccountId){
        if (userAccountId.isPresent()){

            return administrativeAssistantRepository.findByUserAccountId(userAccountId.get());
        }

        return administrativeAssistantRepository.findAll();
    }

    public Student getStudentByID(Long id) {

        return studentRepository.findById(id).orElse(null);
    }

    public TeachingAssistant getTeachingAssistantByID(Long id) {

        return teachingAssistantRepository.findById(id).orElse(null);
    }

    public Instructor getInstructorByID(Long id) {

        return instructorRepository.findById(id).orElse(null);
    }

    public SummerTrainingCoordinator getSummerTrainingCoordinatorByID(Long id) {

        return summerTrainingCoordinatorRepository.findById(id).orElse(null);
    }

    public AdministrativeAssistant getAdministrativeAssistantByID(Long id) {

        return administrativeAssistantRepository.findById(id).orElse(null);
    }

    public Student editStudentByID(Long id, StudentEditRequest request) {
        Optional<Student> student = studentRepository.findById(id);
        if ( student.isPresent() ){
            Student newStudent = student.get();
            newStudent.setLetterGrade(request.getLetterGrade());
            newStudent.setCompanyName(request.getCompanyName());
            newStudent.setCourseCode(request.getCourseCode());
            newStudent.setInstructor(this.getInstructorByID(request.getInstructorId()));
            newStudent.setTeachingAssistant(this.getTeachingAssistantByID(request.getTeachingAssistantId()));
            studentRepository.save(newStudent);
            return newStudent;
        }
        return null;
    }

    public TeachingAssistant editTeachingAssistantByID(Long id, TeachingAssistantEditRequest request) {

        Optional<TeachingAssistant> teachingAssistant = teachingAssistantRepository.findById(id);
        if (teachingAssistant.isPresent()){
            TeachingAssistant newTeachingAssistant = teachingAssistant.get();
            teachingAssistantRepository.save(newTeachingAssistant);
            return newTeachingAssistant;
        }
        return null;

    }
    public Instructor editInstructorByID(Long id, InstructorEditRequest request) {

            Optional<Instructor> instructor = instructorRepository.findById(id);
            if (instructor.isPresent()){
                Instructor newInstructor = instructor.get();
                instructorRepository.save(newInstructor);
                return newInstructor;
            }
            return null;
    }
    public SummerTrainingCoordinator editSummerTrainingCoordinatorByID(Long id, SummerTrainingCoordinatorEditRequest request) {

        Optional<SummerTrainingCoordinator> summerTrainingCoordinator =
                summerTrainingCoordinatorRepository.findById(id);
        if(!summerTrainingCoordinator.isPresent()){
            SummerTrainingCoordinator newSummerTrainingCoordinator = summerTrainingCoordinator.get();
            summerTrainingCoordinatorRepository.save(newSummerTrainingCoordinator);
            return newSummerTrainingCoordinator;
        }
        return null;
    }
    public AdministrativeAssistant editAdministrativeAssistantByID(Long id, AdministrativeAssistantEditRequest request){

        Optional<AdministrativeAssistant> administrativeAssistant =
                administrativeAssistantRepository.findById(id);
        if(!administrativeAssistant.isPresent()){
            AdministrativeAssistant newAdministrativeAssistant = administrativeAssistant.get();
            administrativeAssistantRepository.save(newAdministrativeAssistant);
            return newAdministrativeAssistant;
        }
        return null;
    }
}