package com.quokka.backend.exception;



public class UserProfileDoesNotExistException extends Exception{
    public UserProfileDoesNotExistException(String errorMessage){
        super(errorMessage);
    }
}
