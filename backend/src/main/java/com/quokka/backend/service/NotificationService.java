package com.quokka.backend.service;

import com.quokka.backend.exception.NotificationNotFoundException;
import com.quokka.backend.models.Notification;
import com.quokka.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    public Notification addNotification(Notification newNotification) {

        // this part can be used in other part of the program if needed
        // check if the notification with the same content already exists

//        Optional<Notification> notificationOptional = notificationRepository.findNotificationByContent(newNotification.getContent());
//        if(notificationOptional.isPresent()) {
//            throw new IllegalStateException("Notification with the same CONTENT already exists!");
//        }
        return notificationRepository.save(newNotification);
    }

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElseThrow(() -> new NotificationNotFoundException(id));
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    // @Transactional // This annotation is used to update the database (Amigoscode - Spring Boot Tutorial - 1.21.00)
    public Notification updateNotification(Notification newNotification, Long id) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setTitle(newNotification.getTitle());
            notification.setContent(newNotification.getContent());
            notification.setDate(newNotification.getDate());
            notification.setSeen(newNotification.isSeen());
            return notificationRepository.save(notification);
        }).orElseThrow(() -> new NotificationNotFoundException(id));
    }

    public String deleteNotification(Long id) {
        if(!notificationRepository.existsById(id)){
            throw new NotificationNotFoundException(id);
        }
        notificationRepository.deleteById(id);
        return "Notification with id: " + id + " is deleted successfully!";
    }

    public String deleteAllNotifications() {
        notificationRepository.deleteAll();
        return "All notifications are deleted successfully!";
    }
}