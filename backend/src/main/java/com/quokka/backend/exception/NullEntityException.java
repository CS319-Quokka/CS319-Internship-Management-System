package com.quokka.backend.exception;

public class NullEntityException extends Exception{

    public NullEntityException(String errorMessage){

        super(errorMessage);
    }
}
