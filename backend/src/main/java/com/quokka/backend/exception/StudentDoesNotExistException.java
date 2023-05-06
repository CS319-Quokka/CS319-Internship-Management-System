package com.quokka.backend.exception;

public class StudentDoesNotExistException extends Exception{

    public StudentDoesNotExistException(String errorMessage){

        super(errorMessage);
    }
}
