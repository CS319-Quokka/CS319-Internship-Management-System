package com.quokka.backend.controller;

import com.quokka.backend.Auth.StatusResponse;
import com.quokka.backend.exception.*;
import com.quokka.backend.models.*;
import com.quokka.backend.request.*;
import com.quokka.backend.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
 * This class is responsible for handling all the requests coming from the frontend related to user management.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserManagementController {
    private UserManagementService userManagementService;

    @Autowired
    public UserManagementController(UserManagementService userManagementService){

        this.userManagementService = userManagementService;
    }


    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userManagementService.getUserById(id);
    }


    @GetMapping("/get_all_users/{id}")
    public List<User> getProfilesByAccountId(@PathVariable Long id) {

        List<User> usersList = userManagementService.getProfilesByAccountId(id);
        if(usersList.size() == 0){

            return null;
        }
        return usersList;
    }

    @PatchMapping("/reassign/{id}")
    public Student reassignStudent(@PathVariable Long id, @RequestBody StudentReassignRequest request) {

        return userManagementService.reassignStudent(id, request);
    }

    @PostMapping("/student")
    public Student addStudent(@RequestBody StudentAddRequest request){

        return userManagementService.addStudent(request);
    }

    @PutMapping("student/{id}/status")
    public Student updateStatus(@PathVariable("id") Long studentId, @RequestBody String status) {
        return userManagementService.updateStatus(studentId, status);
    }

    @PutMapping("student/{id}/statusA")
    public Student updatePartAStatus(@PathVariable("id") Long studentId, @RequestBody String status) {
        return userManagementService.updatePartAStatus(studentId, status);
    }

    @PutMapping("student/{id}/statusC")
    public Student updatePartCStatus(@PathVariable("id") Long studentId, @RequestBody String status) {
        return userManagementService.updatePartCStatus(studentId, status);
    }

    @GetMapping("student/{id}/get_all_status")
    public ResponseEntity<StatusResponse> getAllStatus(@PathVariable("id") Long studentId){
        try {
            Student student = userManagementService.getStudentByID(studentId);
            if(student == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
            }

            StatusResponse response = new StatusResponse();
            response.setStatusA(student.getPartAStatus());
            response.setStatusB(student.getStatus());
            response.setStatusC(student.getPartCStatus());

            return ResponseEntity.ok(response);
        } catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "A server error occurred");
        }
    }



    @PostMapping("/teaching_assistant")
    public TeachingAssistant addTeachingAssistant(@RequestBody TeachingAssistantAddRequest request){

        return userManagementService.addTeachingAssistant(request);
    }

    @PostMapping("/instructor")
    public Instructor addInstructor(@RequestBody InstructorAddRequest request){

            return userManagementService.addInstructor(request);
    }

    @PostMapping("/summer_training_coordinator")
    public SummerTrainingCoordinator addSummerTrainingCoordinator(@RequestBody SummerTrainingCoordinatorAddRequest request){

        return userManagementService.addSummerTrainingCoordinator(request);
    }

    @PostMapping("/administrative_assistant")
    public AdministrativeAssistant addAdministrativeAssistant(@RequestBody AdministrativeAssistantAddRequest request){

            return userManagementService.addAdministrativeAssistant(request);
    }

    // TODO: add message to remove methods to check the deletion status in the postman

    @DeleteMapping("/student/{id}")
    public void removeStudentByID(@PathVariable Long id){

        userManagementService.removeStudentByID(id);
    }

    @DeleteMapping("/teaching_assistant/{id}")
    public void removeTeachingAssistantByID(@PathVariable Long id){

        userManagementService.removeTeachingAssistantByID(id);
    }

    @DeleteMapping("/instructor/{id}")
    public void removeInstructorByID(@PathVariable Long id){

        userManagementService.removeInstructorByID(id);
    }

    @DeleteMapping("/summer_training_coordinator/{id}")
    public void removeSummerTrainingCoordinatorByID(@PathVariable Long id){

        userManagementService.removeSummerTrainingCoordinatorByID(id);
    }

    @DeleteMapping("/administrative_assistant/{id}")
    public void removeAdministrativeAssistantByID(@PathVariable Long id){

        userManagementService.removeAdministrativeAssistantByID(id);
    }

    @DeleteMapping("/student")
    public boolean removeAllStudents(){

        return userManagementService.removeAllStudents();
    }

    @DeleteMapping("/teaching_assistant")
    public boolean removeAllTeachingAssistants(){

        return userManagementService.removeAllTeachingAssistants();
    }

    @DeleteMapping("/instructor")
    public boolean removeAllInstructors(){

        return userManagementService.removeAllInstructors();
    }

    @DeleteMapping("/summer_training_coordinator")
    public boolean removeAllSummerTrainingCoordinators(){

        return userManagementService.removeAllSummerTrainingCoordinators();
    }

    @DeleteMapping("/administrative_assistant")
    public boolean removeAllAdministrativeAssistants(){

        return userManagementService.removeAllAdministrativeAssistants();
    }

    @DeleteMapping("/user/{id}")
    public boolean removeUserByID(@PathVariable Long id){

        return userManagementService.removeUserById(id);
    }

    @GetMapping("/student")
    public List<Student> getAllStudents(@RequestParam Optional<Long> accountId,
                                        @RequestParam Optional<Long> instructorId,
                                        @RequestParam Optional<Long> teachingAssistantId,
                                        @RequestParam Optional<String> department){

        return userManagementService.getAllStudents(accountId, instructorId, teachingAssistantId, department);
    }

    @GetMapping("/teaching_assistant")
    public List<TeachingAssistant> getAllTeachingAssistants(@RequestParam Optional<Long> accountId,
                                                            @RequestParam Optional<String> department){

        return userManagementService.getAllTeachingAssistants(accountId, department);
    }

    @GetMapping("/instructor")
    public List<Instructor> getAllInstructors(@RequestParam Optional<Long> accountId,
                                              @RequestParam Optional<String> department){

        return userManagementService.getAllInstructors(accountId, department);
    }

    @GetMapping("/summer_training_coordinator")
    public List<SummerTrainingCoordinator> getAllSummerTrainingCoordinators(@RequestParam Optional<Long> accountId,
                                                                            @RequestParam Optional<String> department){

        return userManagementService.getAllSummerTrainingCoordinators(accountId, department);
    }

    @GetMapping("/administrative_assistant")
    public List<AdministrativeAssistant> getAllAdministrativeAssistants(@RequestParam Optional<Long> accountId,
                                                                        @RequestParam Optional<String> department){

        return userManagementService.getAllAdministrativeAssistants(accountId, department);
    }

    @GetMapping("/student/{id}")
    public Student getStudentByID(@PathVariable Long id){
        return userManagementService.getStudentByID(id);
    }

    @GetMapping("/teaching_assistant/{id}")
    public TeachingAssistant getTeachingAssistantByID(@PathVariable Long id){

        return userManagementService.getTeachingAssistantByID(id);
    }

    @GetMapping("/instructor/{id}")
    public Instructor getInstructorByID(@PathVariable Long id){

            return userManagementService.getInstructorByID(id);
    }

    @GetMapping("/summer_training_coordinator/{id}")
    public SummerTrainingCoordinator getSummerTrainingCoordinatorByID(@PathVariable Long id){

            return userManagementService.getSummerTrainingCoordinatorByID(id);
    }

    @GetMapping("/administrative_assistant/{id}")
    public AdministrativeAssistant getAdministrativeAssistant(@PathVariable Long id){

            return userManagementService.getAdministrativeAssistantByID(id);
    }

    @GetMapping("/get_account_by_user_id/{userId}")
    public UserAccount getAccountByUserId(@PathVariable Long userId){

        return userManagementService.getAccountByUserID(userId);
    }

    @PutMapping("/student/{id}")
    public Student editStudentByID(@PathVariable Long id, @RequestBody StudentEditRequest request){
        return userManagementService.editStudentByID(id, request);
    }

    @PatchMapping("/teaching_assistant/{id}")
    public TeachingAssistant editTeachingAssistantByID(@PathVariable Long id, @RequestBody TeachingAssistantEditRequest request){

        return userManagementService.editTeachingAssistantByID(id, request);
    }

    @PatchMapping("/instructor/{id}")
    public Instructor editInstructorByID(@PathVariable Long id, @RequestBody InstructorEditRequest request){

        return userManagementService.editInstructorByID(id, request);
    }

    @PatchMapping("/summer_training_coordinator/{id}")
    public SummerTrainingCoordinator editSummerTrainingCoordinatorByID(@PathVariable Long id, @RequestBody SummerTrainingCoordinatorEditRequest request){

        return userManagementService.editSummerTrainingCoordinatorByID(id, request);
    }

    @PatchMapping("/administrative_assistant/{id}")
    public AdministrativeAssistant editAdministrativeAssistantByID(@PathVariable Long id, @RequestBody AdministrativeAssistantEditRequest request){

        return userManagementService.editAdministrativeAssistantByID(id, request);
    }
}
