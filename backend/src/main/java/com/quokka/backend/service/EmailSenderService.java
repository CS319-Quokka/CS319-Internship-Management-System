package com.quokka.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Service for account related operations
 */
@Service
public class EmailSenderService {
    //To send emails, we need to use JavaMailSender
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String toEmail, String body, String subject) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("melihhguvenn@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        javaMailSender.send(message);

        System.out.println("Message sent successfully...");
    }
}
