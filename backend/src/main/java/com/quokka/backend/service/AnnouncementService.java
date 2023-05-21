package com.quokka.backend.service;

import com.quokka.backend.exception.AnnouncementNotFoundException;
import com.quokka.backend.models.*;
import com.quokka.backend.repository.AnnouncementRepository;
import com.quokka.backend.request.AnnouncementAddRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {
    private UserManagementService userManagementService;

    private AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService (AnnouncementRepository announcementRepository, UserManagementService userManagementService) {
        this.announcementRepository = announcementRepository;
        this.userManagementService = userManagementService;
    }

    public Announcement addAnnouncement(String senderRole, Long senderId, String audience, AnnouncementAddRequest request) {
        User sender = null;
        if (senderRole.equals("student")) {
            sender = userManagementService.getStudentByID(senderId);
        }
        else if (senderRole.equals("instructor")) {
            sender = userManagementService.getInstructorByID(senderId);
        }
        else if (senderRole.equals("TA")) {
            sender = userManagementService.getTeachingAssistantByID(senderId);
        }
//        else if (senderRole.equals("coordinator")) {
//            sender = userManagementService.getCoordinatorByID(senderId);
//        }
//        else if (senderRole.equals("admin")) {
//            sender = userManagementService.getAdminByID(senderId);
//        }

//        User sender = userManagementService.getUserByIdAndRole(senderId, senderRole);
        if (sender == null) {
            throw new IllegalStateException("Sender for the announcement not found");
        }

        Announcement announcement = new Announcement();
//        announcement.setId(request.getId()); // TODO: I think no need
        announcement.setTitle(request.getTitle());
        announcement.setContent(request.getContent());
        announcement.setDate(request.getDate());
        announcement.setSeen(request.isSeen());

        announcement.setSenderRole(senderRole);
        announcement.setSender(sender);
        announcement.setAudience(audience); // TODO

        return announcementRepository.save(announcement);
    }

    public Announcement getAnnouncementById(Long id) {
        return announcementRepository.findById(id).orElseThrow(() -> new AnnouncementNotFoundException(id));
    }

    public List<Announcement> getAllAnnouncements(Optional<String> userRole, Optional<Long> userId) { // TODO: Optional<String> userRole, Optional<Long> userId --> we need to getAllAnnouncements without parameter to gel all announcements in the system.
        if (userRole.isEmpty() || userId.isEmpty()) {
            return announcementRepository.findAll();
        }
        List<Announcement> announcements= new ArrayList<Announcement>();

        if(userRole.equals("student") ) {
            Student student = userManagementService.getStudentByID(userId.get());
            if (student == null) {
                throw new IllegalStateException("Student not found");
            }

            Instructor instructor = student.getInstructor();
            TeachingAssistant teachingAssistant = student.getTeachingAssistant();
            // TODO: getCoordinators for a department --> getCoordinatorsByDepartment()  -> returns a list of coordinators
            // TODO: getAdministrativeAssistants for a department --> getAdministrativeAssistantsByDepartment() -> returns a list of administrative assistants

            if (instructor != null) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(instructor.getRole(), instructor.getId(), "students"));
            }

            if(teachingAssistant != null) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(teachingAssistant.getRole(), teachingAssistant.getId(), "students"));
            }

            // TODO: if coordinator list is not empty ...
            // TODO: if administrative assistant list is not empty ...

            return announcements;

        }
        else if( userRole.equals("instructor") ) {
            Instructor instructor = userManagementService.getInstructorByID(userId.get());
            if (instructor == null) {
                throw new IllegalStateException("Instructor not found");
            }

            // TODO: getCoordinators for a department --> getCoordinatorsByDepartment()  -> returns a list of coordinators
            // TODO: getAdministrativeAssistants for a department --> getAdministrativeAssistantsByDepartment() -> returns a list of administrative assistants

            return announcements;
        }
        else if( userRole.equals("TA") ) {
            TeachingAssistant teachingAssistant = userManagementService.getTeachingAssistantByID(userId.get());
            if (teachingAssistant == null) {
                throw new IllegalStateException("Teaching Assistant not found");
            }

            // TODO: getCoordinators for a department --> getCoordinatorsByDepartment()  -> returns a list of coordinators
            // TODO: getAdministrativeAssistants for a department --> getAdministrativeAssistantsByDepartment() -> returns a list of administrative assistants

            return announcements;
        }
        else if( userRole.get().equals("coordinator") ) {

            // TODO: getCoordinators for a department --> getCoordinatorsByDepartment()  -> returns a list of coordinators
            // TODO: getAdministrativeAssistants for a department --> getAdministrativeAssistantsByDepartment() -> returns a list of administrative assistants
            // TODO: announcements that are sent by him/her are also included in the list !!!

            return announcements;
        }
        else if( userRole.equals("administrative-assistant") ) {

            // TODO: getCoordinators for a department --> getCoordinatorsByDepartment()  -> returns a list of coordinators
            // TODO: getAdministrativeAssistants for a department --> getAdministrativeAssistantsByDepartment() -> returns a list of administrative assistants
            // TODO: announcements that are sent by him/her are also included in the list !!!

            return announcements;
        }

        return null;
    }

    public List<Announcement> getAllMadeAnnouncements(String senderRole, Long senderId, Optional<String> audience) {
        if (audience.isPresent()) {
            return announcementRepository.findBySenderRoleAndSenderIdAndAudience(senderRole, senderId, audience.get());
        }

        return announcementRepository.findBySenderRoleAndSenderId(senderRole, senderId);
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
