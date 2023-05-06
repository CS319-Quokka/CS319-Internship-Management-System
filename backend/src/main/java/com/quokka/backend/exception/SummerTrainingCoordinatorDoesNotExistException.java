package com.quokka.backend.exception;

public class SummerTrainingCoordinatorDoesNotExistException extends Exception{

    public SummerTrainingCoordinatorDoesNotExistException(String errorMessage){

        super(errorMessage);
    }
}
