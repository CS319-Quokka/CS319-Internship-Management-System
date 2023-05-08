package com.quokka.backend.controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class OnTimeStrategy implements GradeFormStrategy{
    @Override
    public boolean evaluateGradeForm() {
        System.out.println("OnTimeStrategy");
        return false;
    }

    @Override
    public StrategyEnum getStrategyName() {
        return StrategyEnum.OnTimeStrategy;
    }

}
