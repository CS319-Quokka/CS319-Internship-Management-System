package com.quokka.backend.controller;

import com.quokka.backend.models.*;
import com.quokka.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserManagementController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeachingAssistantRepository teachingAssistantRepository;

    @Autowired
    private SummerTrainingCoordinatorRepository summerTrainingCoordinatorRepository;

    @Autowired
    private AdministrativeAssistantRepository administrativeAssistantRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){

        return userRepository.save(newUser);
    }

    @PostMapping("/student")
    Student newStudent(@RequestBody Student newStudent){

        return studentRepository.save(newStudent);
    }

    @PostMapping("/teaching_assistant")
    TeachingAssistant newTeachingAssistant(@RequestBody TeachingAssistant newTeachingAssistant){

        return teachingAssistantRepository.save(newTeachingAssistant);
    }

    @PostMapping("/summer_training_coordinator")
    SummerTrainingCoordinator newSummerTrainingCoordinator(@RequestBody SummerTrainingCoordinator newSummerTrainingCoordinator){

        return summerTrainingCoordinatorRepository.save(newSummerTrainingCoordinator);
    }

    @PostMapping("/administrative_assistant")
    AdministrativeAssistant newAdministrativeAssistant(@RequestBody AdministrativeAssistant newAdministrativeAssistant){

        return administrativeAssistantRepository.save(newAdministrativeAssistant);
    }
}
