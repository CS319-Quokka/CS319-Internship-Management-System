package com.quokka.backend.controller;

import com.quokka.backend.models.Notification;
import com.quokka.backend.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin
//@RequestMapping("/notification")
public class NotificationController {

    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    @PostMapping("/notification")
    Notification addNotification(@RequestBody Notification newNotification){
        return notificationService.addNotification(newNotification);
    }

    @GetMapping ("/notification/{id}")
    Notification getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }

    @GetMapping("/notification")
    List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PutMapping("/notification/{id}")
    Notification updateNotification(@RequestBody Notification newNotification, @PathVariable Long id) {
        return notificationService.updateNotification(newNotification, id);
    }

    @DeleteMapping("/notification/{id}")
    String deleteNotification(@PathVariable Long id) {
        return notificationService.deleteNotification(id);
    }

    @DeleteMapping("/notification")
    String deleteAllNotifications() {
        return notificationService.deleteAllNotifications();
    }
}