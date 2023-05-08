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
    public boolean addStudent(Student student){

        try{

            return userManagementService.addStudent(student);
        }
        catch (StudentAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/teaching_assistant/add")
    public boolean addTeachingAssistant(TeachingAssistant teachingAssistant){

        try{

            return userManagementService.addTeachingAssistant(teachingAssistant);
        }
        catch (TeachingAssistantAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/instructor/add")
    public boolean addInstructor(Instructor instructor){

        try{

            return userManagementService.addInstructor(instructor);
        }
        catch (InstructorAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/summer_training_coordinator/add")
    public boolean addSummerTrainingCoordinator(SummerTrainingCoordinator summerTrainingCoordinator){

        try{

            return userManagementService.addSummerTrainingCoordinator(summerTrainingCoordinator);
        }
        catch (SummerTrainingCoordinatorAlreadyExistsException e){

            return false;
        }
    }

    @PostMapping("/administrative_assistant/add")
    public boolean addAdministrativeAssistant(AdministrativeAssistant administrativeAssistant){

        try{

            return userManagementService.addAdministrativeAssistant(administrativeAssistant);
        }
        catch (AdministrativeAssistantAlreadyExistsException e){

            return false;
        }
    }

    @DeleteMapping("/student/delete")
    public boolean removeStudentByID(Long id){

        try{

            return userManagementService.removeStudentByID(id);
        }
        catch (StudentDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/teaching_assistant/delete")
    public boolean removeTeachingAssistantByID(Long id){

        try{

            return userManagementService.removeTeachingAssistantByID(id);
        }
        catch (TeachingAssistantDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/instructor/delete")
    public boolean removeInstructorByID(Long id){

        try{

            return userManagementService.removeInstructorByID(id);
        }
        catch (InstructorDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/summer_training_coordinator/delete")
    public boolean removeSummerTrainingCoordinatorByID(Long id){

        try{

            return userManagementService.removeSummerTrainingCoordinatorByID(id);
        }
        catch (SummerTrainingCoordinatorDoesNotExistException e){

            return false;
        }
    }

    @DeleteMapping("/administrative_assistant/delete")
    public boolean removeAdministrativeAssistantByID(Long id){

        try{

            return userManagementService.removeAdministrativeAssistantByID(id);
        }
        catch (AdministrativeAssistantDoesNotExistException e){

            return false;
        }
    }

    @GetMapping("/students")
    public List<Student> getAllStudents(){

        return userManagementService.getAllStudents();
    }

    @GetMapping("/teaching_assistants")
    public List<TeachingAssistant> getAllTeachingAssistants(){

        return userManagementService.getAllTeachingAssistants();
    }

    @GetMapping("/instructors")
    public List<Instructor> getAllInstructors(){

        return userManagementService.getAllInstructors();
    }

    @GetMapping("/summer_training_coordinators")
    public List<SummerTrainingCoordinator> getAllSummerTrainingCoordinators(){

        return userManagementService.getAllSummerTrainingCoordinators();
    }

    @GetMapping("/administrative_assistants")
    public List<AdministrativeAssistant> getAllAdministrativeAssistants(){

        return userManagementService.getAllAdministrativeAssistants();
    }

    @GetMapping("/student/get")
    public Student getStudentByID(Long id){

        try{

            return userManagementService.getStudentByID(id);
        }
        catch (StudentDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/teaching_assistant/get")
    public TeachingAssistant getTeachingAssistantByID(Long id){

        try{

            return userManagementService.getTeachingAssistantByID(id);
        }
        catch (TeachingAssistantDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/instructor/get")
    public Instructor getInstructorByID(Long id){

        try{

            return userManagementService.getInstructorByID(id);
        }
        catch (InstructorDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/summer_training_coordinator/get")
    public SummerTrainingCoordinator getSummerTrainingCoordinatorByID(Long id){

        try{

            return userManagementService.getSummerTrainingCoordinatorByID(id);
        }
        catch (SummerTrainingCoordinatorDoesNotExistException e){

            return null;
        }
    }

    @GetMapping("/administrative_assistant/get")
    public AdministrativeAssistant getAdministrativeAssistant(Long id){

        try{

            return userManagementService.getAdministrativeAssistantByID(id);
        }
        catch (AdministrativeAssistantDoesNotExistException e){

            return null;
        }
    }

    @PatchMapping("/student/edit")
    public boolean editStudentByID(Long id, Student editedStudent){

        try{

            return userManagementService.editStudentByID(id, editedStudent);
        }
        catch(StudentDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/teaching_assistant/edit")
    public boolean editTeachingAssistantByID(Long id, TeachingAssistant editedTeachingAssistant){

        try{

            return userManagementService.editTeachingAssistantByID(id, editedTeachingAssistant);
        }
        catch(TeachingAssistantDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/instructor/edit")
    public boolean editInstructorByID(Long id, Instructor editedInstructor){

        try{

            return userManagementService.editInstructorByID(id, editedInstructor);
        }
        catch(InstructorDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/summer_training_coordinator/edit")
    public boolean editSummerTrainingCoordinatorByID(Long id, SummerTrainingCoordinator editedSummerTrainingCoordinator){

        try{

            return userManagementService.editSummerTrainingCoordinatorByID(id, editedSummerTrainingCoordinator);
        }
        catch(SummerTrainingCoordinatorDoesNotExistException | NullEntityException e){

            return false;
        }
    }

    @PatchMapping("/administrative_assistant/edit")
    public boolean editAdministrativeAssistantByID(Long id, AdministrativeAssistant editedAdministrativeAssistant){

        try{

            return userManagementService.editAdministrativeAssistantByID(id, editedAdministrativeAssistant);
        }
        catch(AdministrativeAssistantDoesNotExistException | NullEntityException e){

            return false;
        }
    }
}
