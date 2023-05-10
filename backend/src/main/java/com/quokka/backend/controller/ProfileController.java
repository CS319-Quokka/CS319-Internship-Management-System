package com.quokka.backend.controller;

import com.quokka.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
public class ProfileController {
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


    @GetMapping("/user_profile/get_profile_pic")
    public File getProfilePic(@PathVariable Long id){

        return profileService.getProfilePic(id);
    }

    @GetMapping("/user_profile/get_name")
    public String getName(@PathVariable Long id){

        return profileService.getName(id);
    }

    @GetMapping("/user_profile/get_department")
    public String getDepartment(@PathVariable Long id){

        return profileService.getDepartment(id);
    }

    @GetMapping("/user_profile/get_email")
    public String getEmail(@PathVariable Long id){

        return profileService.getEmail(id);
    }

    @PatchMapping("/user_profile/set_email")
    public boolean setEmail(@PathVariable Long id, @PathVariable String mail){

        return profileService.setEmail(id, mail);
    }

    @PatchMapping("/user_profile/set_department")
    public boolean setDepartment(@PathVariable Long id, @PathVariable String department){

        return profileService.setDepartment(id, department);
    }

    @PatchMapping("/user_profile/set_name")
    public boolean setName(@PathVariable Long id, @PathVariable String name){

        return profileService.setName(id, name);
    }

    @PatchMapping("/user_profile/set_profile_pic")
    public boolean setEmail(@PathVariable Long id, @RequestParam("profilePic") File pic){

        return profileService.editProfilePicture(id, pic);
    }

}
