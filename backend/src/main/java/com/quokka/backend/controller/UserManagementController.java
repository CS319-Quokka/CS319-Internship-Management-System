package com.quokka.backend.controller;

import com.quokka.backend.exception.*;
import com.quokka.backend.models.*;
import com.quokka.backend.request.*;
import com.quokka.backend.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("/student")
    public Student addStudent(@RequestBody StudentAddRequest request){

        return userManagementService.addStudent(request);
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
