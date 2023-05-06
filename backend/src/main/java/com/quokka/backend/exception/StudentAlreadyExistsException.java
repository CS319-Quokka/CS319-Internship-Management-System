package com.quokka.backend.exception;

public class StudentAlreadyExistsException extends Exception{

    public StudentAlreadyExistsException(String errorMessage){

        super(errorMessage);
    }
}
