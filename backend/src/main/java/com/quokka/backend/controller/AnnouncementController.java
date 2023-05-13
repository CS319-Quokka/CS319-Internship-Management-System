package com.quokka.backend.controller;

import com.quokka.backend.models.Announcement;
import com.quokka.backend.service.AnnouncementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/announcement")
@RestController
public class AnnouncementController {

    private AnnouncementService announcementService;

    public AnnouncementController (AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping
    public Announcement addAnnouncement( @RequestBody Announcement announcement) {
        return announcementService.addAnnouncement(announcement);
    }

    @GetMapping("/{id}")
    public Announcement getAnnouncementById(@PathVariable Long id) {
        return announcementService.getAnnouncementById(id);
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    @PatchMapping("/{id}")
    public Announcement updateAnnouncement(@RequestBody Announcement newAnnouncement, @PathVariable Long id) {
        return announcementService.updateAnnouncement(newAnnouncement, id);
    }

    @DeleteMapping("{id}")
    public String deleteAnnouncement(@PathVariable Long id) {
        return announcementService.deleteAnnouncement(id);
    }

    @DeleteMapping
    public String deleteAllAnnouncements() {
        return announcementService.deleteAllAnnouncements();
    }

}
