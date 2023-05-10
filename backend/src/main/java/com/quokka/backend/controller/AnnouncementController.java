package com.quokka.backend.controller;

import com.quokka.backend.models.Announcement;
import com.quokka.backend.service.AnnouncementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnnouncementController {

    private AnnouncementService announcementService;

    public AnnouncementController (AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping("/announcement/add")
    public Announcement addAnnouncement( @RequestBody Announcement announcement) {
        return announcementService.addAnnouncement(announcement);
    }

    @GetMapping("/announcement/get/{id}")
    public Announcement getAnnouncementById(@PathVariable Long id) {
        return announcementService.getAnnouncementById(id);
    }

    @GetMapping("/announcement/get_all")
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    @PatchMapping("/announcement/update/{id}")
    public Announcement updateAnnouncement(@RequestBody Announcement newAnnouncement, @PathVariable Long id) {
        return announcementService.updateAnnouncement(newAnnouncement, id);
    }

    @DeleteMapping("/announcement/delete/{id}")
    public String deleteAnnouncement(@PathVariable Long id) {
        return announcementService.deleteAnnouncement(id);
    }

    @DeleteMapping("/announcement/delete")
    public String deleteAllAnnouncements() {
        return announcementService.deleteAllAnnouncements();
    }

}
