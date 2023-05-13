package com.quokka.backend.controller;

import com.quokka.backend.models.Notification;
import com.quokka.backend.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/notification")
public class NotificationController {

    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification addNotification(@RequestBody Notification newNotification){
        return notificationService.addNotification(newNotification);
    }

    @GetMapping ("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

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