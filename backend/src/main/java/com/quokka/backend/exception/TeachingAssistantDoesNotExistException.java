package com.quokka.backend.exception;

public class TeachingAssistantDoesNotExistException extends Exception{

    public TeachingAssistantDoesNotExistException(String errorMessage){

        super(errorMessage);
    }
}
