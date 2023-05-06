package com.quokka.backend.exception;

public class TeachingAssistantAlreadyExistsException extends Exception{

    public TeachingAssistantAlreadyExistsException(String errorMessage){

        super(errorMessage);
    }
}
