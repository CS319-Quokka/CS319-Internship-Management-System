package com.quokka.backend.exception;

public class InstructorAlreadyExistsException extends Exception{

    public InstructorAlreadyExistsException(String errorMessage){

        super(errorMessage);
    }
}
