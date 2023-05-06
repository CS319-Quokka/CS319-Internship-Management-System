package com.quokka.backend.controller;

import com.quokka.backend.models.Notification;
import com.quokka.backend.models.Report;
import com.quokka.backend.repository.NotificationRepository;
import com.quokka.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
