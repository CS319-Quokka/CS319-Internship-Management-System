package com.quokka.backend.exception;

public class AnnouncementNotFoundException extends RuntimeException {
    public AnnouncementNotFoundException(Long id) {
        super("Could not find the announcement with id: " + id);
    }
}
