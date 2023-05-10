package com.quokka.backend.service;

import com.quokka.backend.models.GradeForm;
import com.quokka.backend.service.StrategyEnum;

public interface GradeFormStrategy {
    boolean evaluateGradeForm(GradeForm gradeForm);
    public StrategyEnum getStrategyName();
}
