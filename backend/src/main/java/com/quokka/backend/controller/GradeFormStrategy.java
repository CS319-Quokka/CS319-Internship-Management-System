package com.quokka.backend.controller;

import com.quokka.backend.models.GradeForm;

public interface GradeFormStrategy {
    boolean evaluateGradeForm(GradeForm gradeForm);
    public StrategyEnum getStrategyName();
}
