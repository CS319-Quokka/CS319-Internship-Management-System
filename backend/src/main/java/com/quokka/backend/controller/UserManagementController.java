package com.quokka.backend.controller;

import com.quokka.backend.exception.*;
import com.quokka.backend.models.*;
import com.quokka.backend.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserManagementController {

    private final UserManagementService userManagementService;

    @Autowired
    public UserManagementController(UserManagementService userManagementService){

        this.userManagementService = userManagementService;
    }

    @PostMapping("/student/add")
    public boolean addStudent(@RequestBody Student student){

        try{

            return userManagementService.addStudent(student);
        }
        catch (StudentAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/teaching_assistant/add")
    public boolean addTeachingAssistant(@RequestBody TeachingAssistant teachingAssistant){

        try{

            return userManagementService.addTeachingAssistant(teachingAssistant);
        }
        catch (TeachingAssistantAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/instructor/add")
    public boolean addInstructor(@RequestBody Instructor instructor){

        try{

            return userManagementService.addInstructor(instructor);
        }
        catch (InstructorAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/summer_training_coordinator/add")
    public boolean addSummerTrainingCoordinator(@RequestBody SummerTrainingCoordinator summerTrainingCoordinator){

        try{

            return userManagementService.addSummerTrainingCoordinator(summerTrainingCoordinator);
        }
        catch (SummerTrainingCoordinatorAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/administrative_assistant/add")
    public boolean addAdministrativeAssistant(@RequestBody AdministrativeAssistant administrativeAssistant){

        try{

            return userManagementService.addAdministrativeAssistant(administrativeAssistant);
        }
        catch (AdministrativeAssistantAlreadyExistsException e){

            return false;
        }
    }

    @DeleteMapping("/student/delete/{id}")
    public boolean removeStudentByID(@PathVariable Long id){

        try{

            return userManagementService.removeStudentByID(id);
        }
        catch (StudentDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/teaching_assistant/delete/{id}")
    public boolean removeTeachingAssistantByID(@PathVariable Long id){

        try{

            return userManagementService.removeTeachingAssistantByID(id);
        }
        catch (TeachingAssistantDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/instructor/delete/{id}")
    public boolean removeInstructorByID(@PathVariable Long id){

        try{

            return userManagementService.removeInstructorByID(id);
        }
        catch (InstructorDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/summer_training_coordinator/delete/{id}")
    public boolean removeSummerTrainingCoordinatorByID(@PathVariable Long id){

        try{

            return userManagementService.removeSummerTrainingCoordinatorByID(id);
        }
        catch (SummerTrainingCoordinatorDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/administrative_assistant/delete/{id}")
    public boolean removeAdministrativeAssistantByID(@PathVariable Long id){

        try{

            return userManagementService.removeAdministrativeAssistantByID(id);
        }
        catch (AdministrativeAssistantDoesNotExistException e){

            return false;
        }
    }

    @GetMapping("/student/get_all")
    public List<Student> getAllStudents(){

        return userManagementService.getAllStudents();
    }

    @GetMapping("/teaching_assistant/get_all")
    public List<TeachingAssistant> getAllTeachingAssistants(){

        return userManagementService.getAllTeachingAssistants();
    }

    @GetMapping("/instructor/get_all")
    public List<Instructor> getAllInstructors(){

        return userManagementService.getAllInstructors();
    }

    @GetMapping("/summer_training_coordinator/get_all")
    public List<SummerTrainingCoordinator> getAllSummerTrainingCoordinators(){

        return userManagementService.getAllSummerTrainingCoordinators();
    }

    @GetMapping("/administrative_assistant/get_all")
    public List<AdministrativeAssistant> getAllAdministrativeAssistants(){

        return userManagementService.getAllAdministrativeAssistants();
    }

    @GetMapping("/student/get/{id}")
    public Student getStudentByID(@PathVariable Long id){

        try{

            return userManagementService.getStudentByID(id);
        }
        catch (StudentDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/teaching_assistant/get/{id}")
    public TeachingAssistant getTeachingAssistantByID(@PathVariable Long id){

        try{

            return userManagementService.getTeachingAssistantByID(id);
        }
        catch (TeachingAssistantDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/instructor/get/{id}")
    public Instructor getInstructorByID(@PathVariable Long id){

        try{

            return userManagementService.getInstructorByID(id);
        }
        catch (InstructorDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/summer_training_coordinator/get/{id}")
    public SummerTrainingCoordinator getSummerTrainingCoordinatorByID(@PathVariable Long id){

        try{

            return userManagementService.getSummerTrainingCoordinatorByID(id);
        }
        catch (SummerTrainingCoordinatorDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/administrative_assistant/get/{id}")
    public AdministrativeAssistant getAdministrativeAssistant(@PathVariable Long id){

        try{

            return userManagementService.getAdministrativeAssistantByID(id);
        }
        catch (AdministrativeAssistantDoesNotExistException e){

            return null;
        }
    }

    @PatchMapping("/student/edit/{id}")
    public boolean editStudentByID(@PathVariable Long id, @RequestBody Student editedStudent){

        try{

            return userManagementService.editStudentByID(id, editedStudent);
        }
        catch(StudentDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/teaching_assistant/edit/{id}")
    public boolean editTeachingAssistantByID(@PathVariable Long id, @RequestBody TeachingAssistant editedTeachingAssistant){

        try{

            return userManagementService.editTeachingAssistantByID(id, editedTeachingAssistant);
        }
        catch(TeachingAssistantDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/instructor/edit/{id}")
    public boolean editInstructorByID(@PathVariable Long id, @RequestBody Instructor editedInstructor){

        try{

            return userManagementService.editInstructorByID(id, editedInstructor);
        }
        catch(InstructorDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/summer_training_coordinator/edit/{id}")
    public boolean editSummerTrainingCoordinatorByID(@PathVariable Long id, @RequestBody SummerTrainingCoordinator editedSummerTrainingCoordinator){

        try{

            return userManagementService.editSummerTrainingCoordinatorByID(id, editedSummerTrainingCoordinator);
        }
        catch(SummerTrainingCoordinatorDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/administrative_assistant/edit/{id}")
    public boolean editAdministrativeAssistantByID(@PathVariable Long id, @RequestBody AdministrativeAssistant editedAdministrativeAssistant){

        try{

            return userManagementService.editAdministrativeAssistantByID(id, editedAdministrativeAssistant);
        }
        catch(AdministrativeAssistantDoesNotExistException | NullEntityException e){

            return false;
        }
    }
}
