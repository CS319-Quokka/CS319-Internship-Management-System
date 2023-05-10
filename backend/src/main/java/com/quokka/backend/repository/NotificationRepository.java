package com.quokka.backend.repository;

import com.quokka.backend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

//    Optional<Notification> findNotificationByDate(Date date);

    // SELECT * FROM notification WHERE id = ?
    @Query("SELECT n FROM Notification n WHERE n.content = ?1")
    Optional<Notification> findNotificationByContent(String content);
}
