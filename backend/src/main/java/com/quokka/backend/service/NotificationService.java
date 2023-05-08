package com.quokka.backend.service;

import com.quokka.backend.exception.NotificationNotFoundException;
import com.quokka.backend.models.Notification;
import com.quokka.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    public NotificationService(){
    }

    public Notification addNotification(Notification newNotification) {
        return notificationRepository.save(newNotification);
    }

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElseThrow(() -> new NotificationNotFoundException(id));
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

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
        return "User with id: " + id + " is deleted successfully!";
    }

    public String deleteAllNotifications() {
        notificationRepository.deleteAll();
        return "All notifications are deleted successfully!";
    }
}