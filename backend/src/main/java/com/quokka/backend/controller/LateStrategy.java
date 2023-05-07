package com.quokka.backend.controller;

public class LateStrategy implements GradeFormStrategy{
    @Override
    public boolean evaluateGradeForm() {
        return false;
    }
}
