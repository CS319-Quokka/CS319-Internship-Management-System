package com.quokka.backend.exception;

public class UserProfileAlreadyExistsException extends Exception{

    public UserProfileAlreadyExistsException(String errorMessage){

        super(errorMessage);
    }
}
