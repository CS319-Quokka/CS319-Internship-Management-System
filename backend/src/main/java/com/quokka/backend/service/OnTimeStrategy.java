package com.quokka.backend.service;

import com.quokka.backend.models.GradeForm;
import org.springframework.stereotype.Service;

@Service
public class OnTimeStrategy implements GradeFormStrategy {
    @Override
    public boolean evaluateGradeForm(GradeForm gradeForm) {
        System.out.println("OnTimeStrategy");
        gradeForm.setOverallEvaluation("Company Evaluation Form is on time");
        return false;
    }

    @Override
    public StrategyEnum getStrategyName() {
        return StrategyEnum.OnTimeStrategy;
    }

}
