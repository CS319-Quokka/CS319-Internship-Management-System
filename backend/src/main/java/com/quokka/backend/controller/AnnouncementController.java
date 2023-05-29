package com.quokka.backend.controller;

import com.quokka.backend.models.Announcement;
import com.quokka.backend.request.AnnouncementAddRequest;
import com.quokka.backend.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/announcement")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<?> getAnnouncementById(@PathVariable Long id) {
        Announcement announcement = announcementService.getAnnouncementById(id);

        if (announcement == null) {
            return ResponseEntity.ok("Announcement not found");
        }

        return ResponseEntity.ok(announcement);

    }

    @GetMapping
    public List<Announcement> getAllAnnouncements(@RequestParam Optional<String> userRole, @RequestParam Optional<Long> userId) {
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
