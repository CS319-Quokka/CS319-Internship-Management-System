package com.quokka.backend.exception;

public class AdministrativeAssistantDoesNotExistException extends Exception{

    public AdministrativeAssistantDoesNotExistException(String errorMessage){

        super(errorMessage);
    }
}
