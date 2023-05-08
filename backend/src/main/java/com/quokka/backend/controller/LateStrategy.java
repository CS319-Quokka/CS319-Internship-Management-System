package com.quokka.backend.controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class LateStrategy implements GradeFormStrategy{
    @Override
    public boolean evaluateGradeForm() {
        System.out.println("Late Strategy is used");
        return false;
    }

    @Override
    public StrategyEnum getStrategyName() {
        return StrategyEnum.LateStrategy;
    }
}
