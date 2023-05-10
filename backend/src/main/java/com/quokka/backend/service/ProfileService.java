package com.quokka.backend.service;

import com.quokka.backend.exception.StudentDoesNotExistException;
import com.quokka.backend.models.Student;
import com.quokka.backend.models.TeachingAssistant;
import com.quokka.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.util.Optional;

public class ProfileService {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public boolean editProfilePicture(Long id, File pic){
        //Methods should be inspected to write an EXCEPTION specifically for type File
        profileRepository.findById(id).get().setProfilePic(pic);
        return true;
    }

    public String getEmail(Long id){
        return profileRepository.findById(id).get().getEmail();
    }

    public String getName(Long id){
        return profileRepository.findById(id).get().getName();
    }

    public String getDepartment(Long id){
        return profileRepository.findById(id).get().getDepartment();
    }

    public File getProfilePic(Long id){
        return profileRepository.findById(id).get().getProfilePic();
    }

    //EXCEPTIONS LATER
    public boolean setEmail(Long id, String mail){
        profileRepository.findById(id).get().setEmail(mail);
        return true;
    }

    public boolean setName(Long id, String name){
        profileRepository.findById(id).get().setName(name);
        return true;
    }

    public boolean setDepartment(Long id, String department){
        profileRepository.findById(id).get().setDepartment(department);
        return true;
    }

}
