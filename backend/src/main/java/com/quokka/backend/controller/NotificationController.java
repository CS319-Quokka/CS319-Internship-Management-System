package com.quokka.backend.controller;

import com.quokka.backend.models.Notification;
import com.quokka.backend.exception.NotificationNotFoundException;
import com.quokka.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping("/notification")
    Notification newNotification(@RequestBody Notification newNotification){
        return notificationRepository.save(newNotification);
    }

    @GetMapping("/notificationS")
    List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @GetMapping ("/notification/{id}")
    Notification getNotificationById(@PathVariable Long id) {
        return notificationRepository.findById(id).orElseThrow(() -> new NotificationNotFoundException(id));
    }

    @PutMapping("/notification/{id}")
    Notification updateNotification(@RequestBody Notification newNotification, @PathVariable Long id) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setTitle(newNotification.getTitle());
            notification.setContent(newNotification.getContent());
            notification.setDate(newNotification.getDate());
            notification.setSeen(newNotification.isSeen());
            return notificationRepository.save(notification);
        }).orElseThrow(() -> new NotificationNotFoundException(id));
    }

    @DeleteMapping("/notification/{id}")
    String deleteNotification(@PathVariable Long id) {
        if(!notificationRepository.existsById(id)){
            throw new NotificationNotFoundException(id);
        }
        notificationRepository.deleteById(id);
        return "User with id: " + id + " is deleted successfully!";
    }
}
