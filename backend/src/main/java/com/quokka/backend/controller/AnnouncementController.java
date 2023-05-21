package com.quokka.backend.controller;

import com.quokka.backend.models.Announcement;
import com.quokka.backend.request.AnnouncementAddRequest;
import com.quokka.backend.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/announcement")
@RestController
public class AnnouncementController {

    private AnnouncementService announcementService;

    @Autowired
    public AnnouncementController (AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping("/made/{senderRole}/{senderId}/{audience}")
    public Announcement addAnnouncement( @PathVariable String senderRole, @PathVariable Long senderId,
                                         @PathVariable String audience, @RequestBody AnnouncementAddRequest request) {
        return announcementService.addAnnouncement(senderRole, senderId, audience,request);
    }

    @GetMapping("/{id}")
    public Announcement getAnnouncementById(@PathVariable Long id) {
        return announcementService.getAnnouncementById(id);
    }

    // TODO
    @GetMapping//("/{userRole}/{userId}")
    public List<Announcement> getAllAnnouncements(@RequestParam Optional<String> userRole, @RequestParam Optional<Long> userId) { //  public List<Announcement> getAllAnnouncements(@PathVariable String userRole, @PathVariable Long userId) {

        return announcementService.getAllAnnouncements(userRole, userId);
    }

    @GetMapping("/made/{senderRole}/{senderId}")
    public List<Announcement> getAllMadeAnnouncements(@PathVariable String senderRole, @PathVariable Long senderId,
                                                      @RequestParam Optional<String> audience) {
        return announcementService.getAllMadeAnnouncements(senderRole, senderId, audience);
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
