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

    // TODO: Use this in AnnouncementService
    public User getUserById(Long userId) {

        // TODO: most of the time we will get the Student. ??

        Optional<Student> student = studentRepository.findById(userId);
        if (student.isPresent()) {
            return student.get();
        }

        Optional<Instructor> instructor = instructorRepository.findById(userId);
        if (instructor.isPresent()) {
            return instructor.get();
        }

        Optional<TeachingAssistant> teachingAssistant = teachingAssistantRepository.findById(userId);
        if (teachingAssistant.isPresent()) {
            return teachingAssistant.get();
        }

        Optional<SummerTrainingCoordinator> summerTrainingCoordinator = summerTrainingCoordinatorRepository.findById(userId);
        if (summerTrainingCoordinator.isPresent()) {
            return summerTrainingCoordinator.get();
        }

        Optional<AdministrativeAssistant> administrativeAssistant = administrativeAssistantRepository.findById(userId);
        if (administrativeAssistant.isPresent()) {
            return administrativeAssistant.get();
        }

        // TODO: Add Admin case

        return null;
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

        List<Student> existingStudents = studentRepository.findByCourseCode(request.getCourseCode());
        for (Student student : existingStudents) {
            if (student.getUserAccount().getId() == request.getAccountId()) {
                return null;
            }
        }

        Long instructorId = request.getInstructorId();
        Instructor instructor = null;
        if (instructorId != null) {
            instructor = this.getInstructorByID(instructorId);
        }

        Long teachingAssistantId = request.getTeachingAssistantId();
        TeachingAssistant teachingAssistant = null;
        if (teachingAssistantId != null) {
            teachingAssistant = this.getTeachingAssistantByID(teachingAssistantId);
        }

        Student student = new Student();
//        student.setId(request.getId());
        student.setCourseCode(request.getCourseCode());
//        student.setLetterGrade(request.getLetterGrade());
        student.setCompanyName(request.getCompanyName());
        student.setRole("Student");

        student.setUserAccount(account);
        student.setInstructor(instructor);
        student.setTeachingAssistant(teachingAssistant);
        student.setStatus("Waiting for upload"); // student.setStatus("Waiting for company evaluation form");
        return studentRepository.save(student);
    }

    public TeachingAssistant addTeachingAssistant(TeachingAssistantAddRequest request){

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        List<TeachingAssistant> existingTeachingAssistants = teachingAssistantRepository.findByUserAccountId(request.getAccountId());
        if (existingTeachingAssistants.size() > 0) {
            return null;
        }

        TeachingAssistant teachingAssistant = new TeachingAssistant();
        teachingAssistant.setUserAccount(account);
        teachingAssistant.setRole("Teaching Assistant");

        return teachingAssistantRepository.save(teachingAssistant);
    }

    public Instructor addInstructor(InstructorAddRequest request) {

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        List<Instructor> existingInstructors = instructorRepository.findByUserAccountId(request.getAccountId());
        if (existingInstructors.size() > 0) {
            return null;
        }

        Instructor instructor = new Instructor();
        instructor.setUserAccount(account);
        instructor.setRole("Instructor");

        return instructorRepository.save(instructor);
    }

    public SummerTrainingCoordinator addSummerTrainingCoordinator(SummerTrainingCoordinatorAddRequest request){

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        List<SummerTrainingCoordinator> existingSummerTrainingCoordinators = summerTrainingCoordinatorRepository.findByUserAccountId(request.getAccountId());
        if (existingSummerTrainingCoordinators.size() > 0) {
            return null;
        }

        SummerTrainingCoordinator summerTrainingCoordinator = new SummerTrainingCoordinator();
        summerTrainingCoordinator.setUserAccount(account);
        summerTrainingCoordinator.setRole("Summer Training Coordinator");

        return summerTrainingCoordinatorRepository.save(summerTrainingCoordinator);
    }

    public AdministrativeAssistant addAdministrativeAssistant(AdministrativeAssistantAddRequest request){

        UserAccount account = accountService.getAccountById(request.getAccountId());
        if (account == null) {
            return null;
        }

        List<AdministrativeAssistant> existingAdministrativeAssistants = administrativeAssistantRepository.findByUserAccountId(request.getAccountId());
        if (existingAdministrativeAssistants.size() > 0) {
            return null;
        }

        AdministrativeAssistant administrativeAssistant = new AdministrativeAssistant();
        administrativeAssistant.setUserAccount(account);
        administrativeAssistant.setRole("Administrative Assistant");

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

    public List<Student> getAllStudents(Optional<Long> userAccountId, Optional <Long> instructorId,
                                        Optional <Long> teachingAssistantId, Optional <String> department){
        if (userAccountId.isPresent() && department.isPresent()) {
            return null;
        }
        else if (userAccountId.isPresent()) { // get all students in a user account
            return studentRepository.findByUserAccountId(userAccountId.get());
        }
        else if (department.isPresent() ) { // get all students in a department
            List<UserAccount> accountsInDepartment = accountService.getAllAccounts(department); // department.get() ??
            List<Student> studentsInDepartment = new ArrayList<Student>();
            for (UserAccount account : accountsInDepartment) {
                studentsInDepartment.addAll(studentRepository.findByUserAccountId(account.getId()));
            }
            return studentsInDepartment;
        }
        else if (instructorId.isPresent()) { // get all students of an instructor
            return studentRepository.findByInstructorId(instructorId.get());
        }
        else if(teachingAssistantId.isPresent()){  // get all students of a teaching assistant
            return studentRepository.findByTeachingAssistantId(teachingAssistantId.get());
        }

        return studentRepository.findAll(); // get all students
    }

    public List<TeachingAssistant> getAllTeachingAssistants(Optional<Long> userAccountId, Optional <String> department){
        if(userAccountId.isPresent() && department.isPresent() ) {
            return null;
        }
        else if(userAccountId.isPresent() ){ // get all teaching assistants in a user account
            return teachingAssistantRepository.findByUserAccountId(userAccountId.get());
        }
        else if (department.isPresent()) {  // get all teaching assistants in a department
            List<UserAccount> accountsInDepartment = accountService.getAllAccounts(department); // department.get() ??
            List<TeachingAssistant> teachingAssistantsInDepartment = new ArrayList<>();

            for (UserAccount account : accountsInDepartment) {
                teachingAssistantsInDepartment.addAll(teachingAssistantRepository.findByUserAccountId(account.getId()));
            }

            return teachingAssistantsInDepartment;
        }

        return teachingAssistantRepository.findAll(); // get all teaching assistants

    }

    public List<Instructor> getAllInstructors(Optional<Long> userAccountId,
                                              Optional <String> department){
        if(userAccountId.isPresent() && department.isPresent() ) {
            return null;
        }
        else if(userAccountId.isPresent()){ // get all instructors in a user account
            return instructorRepository.findByUserAccountId(userAccountId.get());
        }
        else if (department.isPresent()) { // get all instructors in a department
            List<UserAccount> accountsInDepartment = accountService.getAllAccounts(department); // department.get() ??
            List<Instructor> instructorsInDepartment = new ArrayList<>();

            for (UserAccount account : accountsInDepartment) {
                instructorsInDepartment.addAll(instructorRepository.findByUserAccountId(account.getId()));
            }

            return instructorsInDepartment;

        }

        return instructorRepository.findAll(); // get all instructors

    }

    public List<SummerTrainingCoordinator> getAllSummerTrainingCoordinators(Optional<Long> userAccountId,
                                                                            Optional <String> department){
        if ( userAccountId.isPresent() && department.isPresent() ) {
            return null;
        }
        else if (userAccountId.isPresent()){ // get all summer training coordinators in a user account

            return summerTrainingCoordinatorRepository.findByUserAccountId(userAccountId.get());
        }
        else if ( department.isPresent() ) { // get all summer training coordinators in a department

            List<UserAccount> accountsInDepartment = accountService.getAllAccounts(department); // department.get() ??
            List<SummerTrainingCoordinator> summerTrainingCoordinatorsInDepartment = new ArrayList<>();

            for (UserAccount account : accountsInDepartment) {
                summerTrainingCoordinatorsInDepartment.addAll(summerTrainingCoordinatorRepository.findByUserAccountId(account.getId()));
            }

            return summerTrainingCoordinatorsInDepartment;
        }

        return summerTrainingCoordinatorRepository.findAll(); // get all summer training coordinators


    }

    public List<AdministrativeAssistant> getAllAdministrativeAssistants(Optional<Long> userAccountId,
                                                                        Optional <String> department){
        if ( userAccountId.isPresent() && department.isPresent() ) {
            return null;
        }
        else if (userAccountId.isPresent()){

            return administrativeAssistantRepository.findByUserAccountId(userAccountId.get());
        }
        else if ( department.isPresent() ) {

            List<UserAccount> accountsInDepartment = accountService.getAllAccounts(department); // department.get() ??
            List<AdministrativeAssistant> administrativeAssistantsInDepartment = new ArrayList<>();

            for (UserAccount account : accountsInDepartment) {
                administrativeAssistantsInDepartment.addAll(administrativeAssistantRepository.findByUserAccountId(account.getId()));
            }

            return administrativeAssistantsInDepartment;
        }

        return administrativeAssistantRepository.findAll(); // get all administrative assistants
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