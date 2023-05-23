package com.quokka.backend.service;

import com.quokka.backend.exception.NotificationNotFoundException;
import com.quokka.backend.models.Notification;
import com.quokka.backend.models.User;
import com.quokka.backend.repository.NotificationRepository;
import com.quokka.backend.request.NotificationAddRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;
    private UserManagementService userManagementService;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, UserManagementService userManagementService){
        this.notificationRepository = notificationRepository;
        this.userManagementService = userManagementService;
    }

    // DONE
    public Notification addNotification(Long userId, NotificationAddRequest request) {
        User user = userManagementService.getUserById(userId);
        if (user == null) {
            throw new IllegalStateException("User with id " + userId + " does not exist!");
        }

        Notification notification = new Notification();
        notification.setTitle(request.getTitle());
        notification.setContent(request.getContent());
        notification.setDate(request.getDate());
        notification.setSeen(false);
        notification.setUser(user);

        return notificationRepository.save(notification);
    }

    // DONE
    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElseThrow(() -> new NotificationNotFoundException(id));
    }

    // DONE
    public List<Notification> getAllNotifications(Optional<Long> userId) {
        if ( userId.isPresent() ) {
            return notificationRepository.findByUserId(userId.get());
        }
        return notificationRepository.findAll();
    }

    // TODO
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