package com.quokka.backend.service;

import com.quokka.backend.exception.AnnouncementNotFoundException;
import com.quokka.backend.models.Announcement;
import com.quokka.backend.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    private AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService (AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public Announcement addAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public Announcement getAnnouncementById(Long id) {
        return announcementRepository.findById(id).orElseThrow(() -> new AnnouncementNotFoundException(id));
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Announcement updateAnnouncement(Announcement newAnnouncement, Long id) {
        return announcementRepository.findById(id).map(announcement -> {
            announcement.setTitle(newAnnouncement.getTitle());
            announcement.setContent(newAnnouncement.getContent());
            announcement.setDate(newAnnouncement.getDate());
            return announcementRepository.save(announcement);
        }).orElseThrow(() -> new AnnouncementNotFoundException(id));
    }

    public String deleteAnnouncement(Long id) {
        boolean exists = announcementRepository.existsById(id);
        if(!exists){
            throw new AnnouncementNotFoundException(id);
        }
        else{
            announcementRepository.deleteById(id);
            return "Announcement with id: " + id + " is deleted successfully!";
        }
    }

    public String deleteAllAnnouncements() {
        announcementRepository.deleteAll();
        return "All announcements are deleted successfully!";
    }
}
