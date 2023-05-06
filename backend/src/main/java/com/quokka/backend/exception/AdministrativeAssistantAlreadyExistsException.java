package com.quokka.backend.exception;

import com.quokka.backend.models.AdministrativeAssistant;

public class AdministrativeAssistantAlreadyExistsException extends Exception{

    public AdministrativeAssistantAlreadyExistsException(String errorMessage){

        super(errorMessage);
    }
}
