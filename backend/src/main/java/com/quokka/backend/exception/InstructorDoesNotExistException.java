package com.quokka.backend.exception;


public class InstructorDoesNotExistException extends Exception{

    public InstructorDoesNotExistException(String errorMessage){

        super(errorMessage);
    }
}
