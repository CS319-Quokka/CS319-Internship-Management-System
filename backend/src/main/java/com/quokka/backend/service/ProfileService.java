package com.quokka.backend.service;

import com.quokka.backend.exception.StudentDoesNotExistException;
import com.quokka.backend.models.Student;
import com.quokka.backend.models.TeachingAssistant;
import com.quokka.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class ProfileService {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public void viewStudentInformation(Student student, Long profileId)throws StudentDoesNotExistException {
        if (profileRepository.findById(profileId).get().getId() != student.getId()){
            throw new StudentDoesNotExistException("Student with id " + student.getId() +
                    " does not exist. It cannot be removed!");
        }

        //ToDo
    }
}
