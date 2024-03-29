package com.quokka.backend.service;

import com.quokka.backend.exception.AnnouncementNotFoundException;
import com.quokka.backend.models.*;
import com.quokka.backend.repository.AnnouncementRepository;
import com.quokka.backend.request.AnnouncementAddRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/**
 * Service for announcement related operations
 */
@Service
public class AnnouncementService {
    //To modify the user
    private UserManagementService userManagementService;

    //To access the methods of JPARepository
    private AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService (AnnouncementRepository announcementRepository, UserManagementService userManagementService) {
        this.announcementRepository = announcementRepository;
        this.userManagementService = userManagementService;
    }

    /**
     * Adds announcement to the database
     * @param senderRole determines which user is sending the announcement
     * @param senderId to fetch the user from the database
     * @param audience determines which users should see the announcement
     * @param request contains the announcement information
     * @return
     */
    public Announcement addAnnouncement(String senderRole, Long senderId, String audience, AnnouncementAddRequest request) {
        User sender = null;
        if (senderRole.equals("Instructor")) {
            sender = userManagementService.getInstructorByID(senderId);
        }
        else if (senderRole.equals("Teaching Assistant")) {
            sender = userManagementService.getTeachingAssistantByID(senderId);
        }
        else if (senderRole.equals("Administrative Assistant")) {
            sender = userManagementService.getAdministrativeAssistantByID(senderId);
        }
        else if (senderRole.equals("Summer Training Coordinator")) {
            sender = userManagementService.getSummerTrainingCoordinatorByID(senderId);
        }

        if (sender == null) {
            return null;
        }

        //Sets the announcement information
        Announcement announcement = new Announcement();

        announcement.setTitle(request.getTitle());
        announcement.setContent(request.getContent());
        announcement.setDate(request.getDate());

        announcement.setSenderRole(senderRole);
        announcement.setSender(sender);
        announcement.setAudience(audience);
        // "CS" -> CS department, "IE" -> IE department etc.

        return announcementRepository.save(announcement);
    }

    public Announcement getAnnouncementById(Long id) {
        return announcementRepository.findById(id).orElseThrow(() -> new AnnouncementNotFoundException(id));
    }


    /**
     * Gets all announcements from the database
     * @param userRole to access the path
     * @param userId to access the user
     * @return
     */
    public List<Announcement> getAllAnnouncements(Optional<String> userRole, Optional<Long> userId) {
        if ( !(userRole.isPresent() && userId.isPresent() ) ) {
            System.out.println("Optional parameter userRole or userId is not present");
            return null;
        }

        System.out.println("userRole: " + userRole.get() + " and userId: " + userId.get());

        List<Announcement> announcements= new ArrayList<Announcement>();

        if(userRole.get().equals("Student") ) {
            Student student = userManagementService.getStudentByID(userId.get());
            if (student == null) {
                return null;
            }

            System.out.println("Show announcements for student: " + student.getUserAccount().getLastName() );

            //Setting the data for the student to locale variables
            Instructor instructor = student.getInstructor();
            TeachingAssistant teachingAssistant = student.getTeachingAssistant();
            List<AdministrativeAssistant> administrativeAssistants =
                    userManagementService.getAllAdministrativeAssistants(Optional.empty(),
                            student.getUserAccount().getDepartment().describeConstable());
            List<SummerTrainingCoordinator> coordinators =
                    userManagementService.getAllSummerTrainingCoordinators(Optional.empty(),
                            student.getUserAccount().getDepartment().describeConstable());


            if (instructor != null) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(instructor.getRole(),
                                                            instructor.getId(), "Students"));
            }

            if(teachingAssistant != null) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                                        teachingAssistant.getRole(), teachingAssistant.getId(), "Students"));
            }

            for (AdministrativeAssistant administrativeAssistant : administrativeAssistants) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        administrativeAssistant.getRole(),
                        administrativeAssistant.getId(), "Students"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        administrativeAssistant.getRole(),
                        administrativeAssistant.getId(), student.getCourseCode().substring(0,2)) ); // substring(0,2) -> CS, IE, ...
            }

            for (SummerTrainingCoordinator coordinator : coordinators) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        coordinator.getRole(),
                        coordinator.getId(), "Students"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        coordinator.getRole(),
                        coordinator.getId(), student.getCourseCode().substring(0,2)) );

            }

            announcements.sort(Comparator.comparing(Announcement::getId).reversed());

            return announcements;
        }
        else if( userRole.get().equals("Instructor") ) {
            Instructor instructor = userManagementService.getInstructorByID(userId.get());
            if (instructor == null) {
                return null;
            }

            System.out.println("Show announcements for instructor: " + instructor.getUserAccount().getLastName() );

            announcements.addAll(announcementRepository.findBySenderRoleAndSenderId( instructor.getRole(),
                                                                                     instructor.getId() ) );

            List<AdministrativeAssistant> administrativeAssistants =
                    userManagementService.getAllAdministrativeAssistants(Optional.empty(),
                            instructor.getUserAccount().getDepartment().describeConstable());

            List<SummerTrainingCoordinator> coordinators =
                    userManagementService.getAllSummerTrainingCoordinators(Optional.empty(),
                            instructor.getUserAccount().getDepartment().describeConstable());

            for (AdministrativeAssistant administrativeAssistant : administrativeAssistants) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                                                            administrativeAssistant.getRole(),
                                                            administrativeAssistant.getId(), "Instructors"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                                                            administrativeAssistant.getRole(),
                                                            administrativeAssistant.getId(),
                                                            instructor.getUserAccount().getDepartment() ));
            }
            for (SummerTrainingCoordinator coordinator : coordinators) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                                                            coordinator.getRole(),
                                                            coordinator.getId(), "Instructors"));
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                                                            coordinator.getRole(),
                                                            coordinator.getId(),
                                                            instructor.getUserAccount().getDepartment() ));
            }

            announcements.sort(Comparator.comparing(Announcement::getId).reversed());

            return announcements;
        }
        else if( userRole.get().equals("Teaching Assistant") ) {
            TeachingAssistant teachingAssistant = userManagementService.getTeachingAssistantByID(userId.get());
            if (teachingAssistant == null) {
                return null;
                //throw new IllegalStateException("Teaching Assistant not found");
            }

            announcements.addAll(announcementRepository.findBySenderRoleAndSenderId( teachingAssistant.getRole(),
                    teachingAssistant.getId() ) );

            List<AdministrativeAssistant> administrativeAssistants =
                    userManagementService.getAllAdministrativeAssistants(Optional.empty(),
                            teachingAssistant.getUserAccount().getDepartment().describeConstable());

            List<SummerTrainingCoordinator> coordinators =
                    userManagementService.getAllSummerTrainingCoordinators(Optional.empty(),
                            teachingAssistant.getUserAccount().getDepartment().describeConstable());

            for (AdministrativeAssistant administrativeAssistant : administrativeAssistants) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        administrativeAssistant.getRole(),
                        administrativeAssistant.getId(), "Teaching Assistants"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        administrativeAssistant.getRole(),
                        administrativeAssistant.getId(),
                        teachingAssistant.getUserAccount().getDepartment() ) );

            }
            for (SummerTrainingCoordinator coordinator : coordinators) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        coordinator.getRole(),
                        coordinator.getId(), "Teaching Assistants"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        coordinator.getRole(),
                        coordinator.getId(),
                        teachingAssistant.getUserAccount().getDepartment() ) );
            }

            announcements.sort(Comparator.comparing(Announcement::getId).reversed());
            return announcements;
        }
        else if( userRole.get().equals("Administrative Assistant") ) {
            AdministrativeAssistant administrativeAssistant = userManagementService.getAdministrativeAssistantByID(userId.get());
            if (administrativeAssistant == null) {
//                throw new IllegalStateException("Administrative Assistant not found");
                return null;
            }

            // Announcements that are sent by this administrative assistant are also included in the list.
            List<AdministrativeAssistant> administrativeAssistants =
                    userManagementService.getAllAdministrativeAssistants(Optional.empty(),
                            administrativeAssistant.getUserAccount().getDepartment().describeConstable());

            List<SummerTrainingCoordinator> coordinators =
                    userManagementService.getAllSummerTrainingCoordinators(Optional.empty(),
                            administrativeAssistant.getUserAccount().getDepartment().describeConstable());

            for (AdministrativeAssistant otherAdministrativeAssistant : administrativeAssistants) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        otherAdministrativeAssistant.getRole(),
                        otherAdministrativeAssistant.getId(), "Administrative Assistants"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        otherAdministrativeAssistant.getRole(),
                        otherAdministrativeAssistant.getId(),
                        administrativeAssistant.getUserAccount().getDepartment() ) );
            }
            for (SummerTrainingCoordinator coordinator : coordinators) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        coordinator.getRole(),
                        coordinator.getId(), "Administrative Assistants"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        coordinator.getRole(),
                        coordinator.getId(),
                        administrativeAssistant.getUserAccount().getDepartment() ) );
            }

            announcements.sort(Comparator.comparing(Announcement::getId).reversed());

            return announcements;
        }
        else if( userRole.get().equals("Summer Training Coordinator") ) {
            SummerTrainingCoordinator coordinator = userManagementService.getSummerTrainingCoordinatorByID(userId.get());
            if (coordinator == null) {
                return null;
            }

            // Announcements that are sent by this coordinator are also included in the list !!!
            List<AdministrativeAssistant> administrativeAssistants =
                    userManagementService.getAllAdministrativeAssistants(Optional.empty(),
                            coordinator.getUserAccount().getDepartment().describeConstable());
            List<SummerTrainingCoordinator> coordinators =
                    userManagementService.getAllSummerTrainingCoordinators(Optional.empty(),
                            coordinator.getUserAccount().getDepartment().describeConstable());
            for (AdministrativeAssistant administrativeAssistant : administrativeAssistants) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        administrativeAssistant.getRole(),
                        administrativeAssistant.getId(), "Summer Training Coordinators"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        administrativeAssistant.getRole(),
                        administrativeAssistant.getId(),
                        coordinator.getUserAccount().getDepartment() ) );
            }
            for (SummerTrainingCoordinator otherCoordinator : coordinators) {
                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        otherCoordinator.getRole(),
                        otherCoordinator.getId(), "Summer Training Coordinators"));

                announcements.addAll(announcementRepository.findBySenderRoleAndSenderIdAndAudience(
                        otherCoordinator.getRole(),
                        otherCoordinator.getId(),
                        coordinator.getUserAccount().getDepartment() ) );
            }

            announcements.sort(Comparator.comparing(Announcement::getId).reversed());

            return announcements;
        }

        return null;
    }

    /**
     * Gets all announcements made by a specific user
     * @param senderRole
     * @param senderId
     * @param audience
     * @return list of announcements that are made by a specific user
     */
    public List<Announcement> getAllMadeAnnouncements(String senderRole, Long senderId, Optional<String> audience) {
        //checks whether the optional exists or not
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
