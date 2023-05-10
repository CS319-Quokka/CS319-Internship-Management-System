package com.quokka.backend.service;

import com.quokka.backend.models.GradeForm;
import org.springframework.stereotype.Service;

@Service
public class LateStrategy implements GradeFormStrategy {
    @Override
    public boolean evaluateGradeForm(GradeForm gradeForm) {
        System.out.println("Late Strategy is used");
        gradeForm.setOverallEvaluation("Company Evaluation Form is late");
        return false;
    }

    @Override
    public StrategyEnum getStrategyName() {
        return StrategyEnum.LateStrategy;
    }
}
