package com.quokka.backend.repository;

import com.quokka.backend.models.Announcement;
import com.quokka.backend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    List<Announcement> findBySenderRoleAndSenderId(String senderRole, Long senderId);

    List<Announcement> findBySenderRoleAndSenderIdAndAudience(String senderRole, Long senderId, String audience);
}
