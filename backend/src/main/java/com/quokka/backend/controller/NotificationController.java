package com.quokka.backend.controller;

import com.quokka.backend.models.Notification;
import com.quokka.backend.request.AnnouncementAddRequest;
import com.quokka.backend.request.NotificationAddRequest;
import com.quokka.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * This class is responsible for handling all the requests coming from the frontend related to notifications.
 */
@RestController
@RequestMapping("/notification")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    // DONE
    @PostMapping("/{userId}")
    public Notification addNotification( @PathVariable Long userId,  @RequestBody NotificationAddRequest request){
        return notificationService.addNotification(userId, request);
    }

    // DONE
    @GetMapping ("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }

    // DONE
    @GetMapping
    public List<Notification> getAllNotifications(Optional<Long> userId) {
        return notificationService.getAllNotifications(userId);
    }

    // TODO
    @PutMapping("/{id}")
    public Notification updateNotification(@RequestBody Notification newNotification, @PathVariable Long id) {
        return notificationService.updateNotification(newNotification, id);
    }

    @DeleteMapping("/{id}")
    public String deleteNotification(@PathVariable Long id) {
        return notificationService.deleteNotification(id);
    }

    @DeleteMapping
    public String deleteAllNotifications() {
        return notificationService.deleteAllNotifications();
    }
}