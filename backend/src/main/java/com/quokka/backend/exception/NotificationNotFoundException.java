package com.quokka.backend.exception;

public class NotificationNotFoundException extends RuntimeException {
    public NotificationNotFoundException(Long id) {
        super("Could not find the notification with id: " + id);
    }
}
